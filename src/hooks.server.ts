import {
	deleteSessionTokenCookie,
	setSessionTokenCookie,
	validateSessionToken
} from './lib/server/session';

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session') ?? null;
	if (token === null) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = validateSessionToken(token);
	if (session !== null) {
		setSessionTokenCookie(event, token, session.expires_at);
	} else {
		deleteSessionTokenCookie(event);
	}

	event.locals.session = session;
	event.locals.user = user;
	return resolve(event);
};
