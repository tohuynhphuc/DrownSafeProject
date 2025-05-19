import { db, type DatabaseUser } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import 'dotenv/config';
import nodemailer from 'nodemailer';

import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, '/main_dashboard');
	}
	return {};
};

const transporter = nodemailer.createTransport({
	host: 'mx1.20050703.xyz',
	auth: {
		user: 'drownsafe@20050703.xyz',
		pass: process.env.PASSWORD
	},
	logger: true,
	debug: true
});

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username_or_email = formData.get('username_or_email');

		// basic check
		if (typeof username_or_email !== 'string') {
			return fail(400, { message: 'Invalid username or email' });
		}

		let user = db
			.prepare<[string, string], DatabaseUser>('SELECT * FROM user WHERE username = ? OR email = ?')
			.get(username_or_email, username_or_email);

		if (!user) {
			return {
				message: `An email has been sent to the provided account. Please follow the instructions in the email.`
			};
		}

		try {
			db.prepare<string>('DELETE FROM token WHERE userID = ?').run(user.id);

			const tokenID = generateIdFromEntropySize(25);
			const tokenHash = encodeHexLowerCase(sha256(new TextEncoder().encode(tokenID)));
			db.prepare<[string, string, number]>(
				'INSERT INTO token (userID, tokenHash, expiresAt) VALUES (?, ?, ?)'
			).run(user.id, tokenHash, Date.now() + 60 * 60 * 1000);

			const mailOptions = {
				from: process.env.EMAIL,
				to: user.email,
				subject: '[DrownSafe] - Reset Password',
				html: `Please click on the link below to reset your password. If you didn't request this, please ignore this email and move on with your life.<br><br><a href="https://drownsafe.20050703.xyz/forget/${tokenID}">Click here!</a><br><br>Or you can copy the link and paste it into your browser: https://drownsafe.20050703.xyz/forget/${tokenID}`
			};

			const info = await transporter.sendMail(mailOptions);

			console.log('Email sent: ' + info.response);

			return {
				message:
					'An email has been sent to the provided account. Please follow the instructions in the email.'
			};
		} catch (e) {
			console.log(e);
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
	}
};

function generateIdFromEntropySize(size: number): string {
	const buffer = crypto.getRandomValues(new Uint8Array(size));
	return encodeBase32LowerCaseNoPadding(buffer);
}
