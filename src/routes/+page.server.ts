import { fail, redirect } from "@sveltejs/kit";

import { lucia } from "$lib/server/auth";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, "/login");
	}

	return {
		id: event.locals.user.id,
		username: event.locals.user.username,
		name: event.locals.user.name,
		email: event.locals.user.email,
		studentID: event.locals.user.studentID
	};
};

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}

		await lucia.invalidateSession(event.locals.session?.id);

		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		redirect(302, "/login");
	}
};
