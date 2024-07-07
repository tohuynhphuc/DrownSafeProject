import { lucia } from "$lib/server/auth.js";
import { error, redirect } from "@sveltejs/kit";

export const GET = async (event) => {
	if (!event.locals.session) {
		return error(401);
	}

	await lucia.invalidateSession(event.locals.session?.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: ".",
		...sessionCookie.attributes
	});
	redirect(302, "/");
};
