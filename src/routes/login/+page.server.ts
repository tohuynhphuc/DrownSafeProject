import { lucia } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { fail, redirect } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";

import { admin, guard, password_length, username_length } from "$lib/const";
import type { DatabaseUser } from "$lib/server/db";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		if (event.locals.user.username === admin) {
			return redirect(302, "/admin_dashboard");
		}

		if (event.locals.user.username === guard) {
			return redirect(302, "/guard_dashboard");
		}

		return redirect(302, "/main_dashboard");
	}
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get("username");
		const password = formData.get("password");
		// basic check
		if (typeof username !== "string" || username.length < username_length[0] || username.length > username_length[1]) {
			return fail(400, {
				message: "Invalid username"
			});
		}
		if (typeof password !== "string" || password.length < password_length[0] || password.length > password_length[1]) {
			return fail(400, {
				message: "Invalid password"
			});
		}

		const existingUser = db.prepare("SELECT * FROM user WHERE username = ?").get(username) as DatabaseUser | undefined;
		if (!existingUser) {
			return fail(400, {
				message: "Incorrect username or password"
			});
		}

		const validPassword = await new Argon2id().verify(existingUser.password, password);
		if (!validPassword) {
			return fail(400, {
				message: "Incorrect username or password"
			});
		}

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});

		if (username === admin) {
			return redirect(302, "/admin_dashboard");
		}

		if (username === guard) {
			return redirect(302, "/guard_dashboard");
		}

		return redirect(302, "/main_dashboard");
	}
};
