import { password_length } from '$lib/const';
import { db, type DatabaseToken, type DatabaseUser } from '$lib/server/db';
import { hashSync } from '@node-rs/argon2';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import 'dotenv/config';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/main_dashboard');
	}
	const tokenHash = encodeHexLowerCase(sha256(new TextEncoder().encode(event.params.token)));

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

		const hashedPassword = hashSync(password);

		try {
			const tokenHash = encodeHexLowerCase(sha256(new TextEncoder().encode(event.params.token)));
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
