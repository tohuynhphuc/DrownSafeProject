// * Import
import { lucia } from "$lib/server/auth"
import type { Handle } from "@sveltejs/kit"

// * Export
export const handle: Handle = async (input) => {
	const sessionId = input.event.cookies.get(lucia.sessionCookieName)
	if (!sessionId) {
		input.event.locals.user = null
		input.event.locals.session = null
		return input.resolve(input.event)
	}

	const { session, user } = await lucia.validateSession(sessionId)
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id)
		input.event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		})
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie()
		input.event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		})
	}
	input.event.locals.user = user
	input.event.locals.session = session
	return input.resolve(input.event)
}
