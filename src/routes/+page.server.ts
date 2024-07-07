import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return;
	}

	return {
		id: event.locals.user.id,
		username: event.locals.user.username,
		name: event.locals.user.name,
		email: event.locals.user.email,
		studentID: event.locals.user.studentID
	};
};
