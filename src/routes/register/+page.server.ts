import { lucia } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import { SqliteError } from 'better-sqlite3';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';

import { password_length, username_length, username_regex } from '$lib/const';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/main_dashboard');
	}
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		const name = formData.get('name');
		const studentID = formData.get('studentID');
		const email = formData.get('email');
		const dob = formData.get('dob');
		// basic check
		if (typeof username !== 'string' || username.length < username_length[0] || username.length > username_length[1] || !username_regex.test(username)) {
			return fail(400, {
				message: `Username must be ${username_length[0]}-${username_length[1]} characters long and only consist of letters, numbers, dashes, and underscores`
			});
		}
		if (typeof password !== 'string' || password.length < password_length[0] || password.length > password_length[1]) {
			return fail(400, {
				message: `Password must be ${password_length[0]}-${password_length[1]} characters long`
			});
		}

		const hashedPassword = await new Argon2id().hash(password);
		const userId = generateId(15);

		try {
			db.prepare('INSERT INTO user (id, username, password, name, studentID, email, dob) VALUES(?, ?, ?, ?, ?, ?, ?)').run(userId, username, hashedPassword, name, studentID, email, dob);

			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} catch (e) {
			if (e instanceof SqliteError && e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
				return fail(400, {
					message: 'Username already taken'
				});
			}
			console.log(e);
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}

		if (username === 'administration') {
			return redirect(302, '/admin_dashboard');
		}

		if (username === 'guard') {
			return redirect(302, '/guard_dashboard');
		}

		return redirect(302, '/main_dashboard');
	}
};
