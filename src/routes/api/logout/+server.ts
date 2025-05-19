import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/session.js';
import { error, redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	if (!event.locals.session) {
		return error(401);
	}

	invalidateSession(event.locals.session.id);

	deleteSessionTokenCookie(event);

	redirect(302, '/');
};
