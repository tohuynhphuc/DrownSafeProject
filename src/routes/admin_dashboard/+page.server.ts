import { redirect } from "@sveltejs/kit";

import { admin } from "$lib/const";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user || event.locals.user.username != admin) {
		return redirect(302, "/login");
	}

	return {
		id: event.locals.user.id,
		username: event.locals.user.username,
		name: event.locals.user.name,
		email: event.locals.user.email,
		studentID: event.locals.user.studentID,
		sessionId: event.locals.session?.id
	};
};
