import { db, type DatabaseToken, type DatabaseUser } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import 'dotenv/config';

import { password_length } from '$lib/const';
import { sha256 } from 'oslo/crypto';
import { encodeHex } from 'oslo/encoding';
import { Argon2id } from 'oslo/password';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/main_dashboard');
	}
	const tokenHash = encodeHex(await sha256(new TextEncoder().encode(event.params.token)));

	const entry = db
		.prepare<string, DatabaseToken>('SELECT * FROM token WHERE tokenHash = ?')
		.get(tokenHash);

	if (entry) {
		const user = db
			.prepare<string, DatabaseUser>('SELECT * FROM user WHERE id = ?')
			.get(entry.userID);
		if (user) {
			return { username: user.username };
		}
	}

	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const password = formData.get('password');
		// basic check
		if (
			typeof password !== 'string' ||
			password.length < password_length[0] ||
			password.length > password_length[1]
		) {
			return fail(400, {
				message: `Password must be ${password_length[0]}-${password_length[1]} characters long`
			});
		}

		const hashedPassword = await new Argon2id().hash(password);

		try {
			const tokenHash = encodeHex(await sha256(new TextEncoder().encode(event.params.token)));
			const entry = db
				.prepare<string, DatabaseToken>('SELECT * FROM token WHERE tokenHash = ?')
				.get(tokenHash);

			if (entry) {
				db.prepare<[string, string]>('UPDATE user SET password = ? WHERE id = ?').run(
					hashedPassword,
					entry.userID
				);
				db.prepare<string>('DELETE from token WHERE tokenHash = ?').run(tokenHash);
				return {
					message:
						'Password Updated Successfully. You will be redirected to the Main Dashboard shortly'
				};
			} else {
				return fail(400, { message: 'Account not found.' });
			}
		} catch (e) {
			console.log(e);
			return fail(500, { message: 'An unknown error occurred' });
		}
	}
};
