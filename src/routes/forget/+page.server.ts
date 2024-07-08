import { db, type DatabaseUser } from "$lib/server/db";
import { fail, redirect } from "@sveltejs/kit";
import "dotenv/config";
import nodemailer from "nodemailer";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";

import { generateIdFromEntropySize } from "lucia";
import { createDate, TimeSpan } from "oslo";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, "/main_dashboard");
	}
	return {};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get("username");
		const email = formData.get("email");
		// basic check
		if (typeof username !== "string" || typeof email !== "string") {
			return fail(400, {
				message: `Invalid username or email`
			});
		}
		if (!username && !email) {
			return fail(400, { message: `You need to provide email or username` });
		}

		let user: DatabaseUser | undefined;

		if (username && email) {
			user = db
				.prepare("SELECT * FROM user WHERE username = ? AND email = ?")
				.get(username, email) as DatabaseUser;
		} else if (username) {
			user = db.prepare("SELECT * FROM user WHERE username = ?").get(username) as DatabaseUser;
		} else if (email) {
			user = db.prepare("SELECT * FROM user WHERE email = ?").get(email) as DatabaseUser;
		}

		if (!user) {
			return {
				message: `An email has been sent to the provided account. Please follow the instructions in the email.`
			};
		}

		try {
			db.prepare("DELETE FROM token WHERE userID = ?").run(user.id);

			const tokenID = generateIdFromEntropySize(25);
			const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenID)));
			db.prepare("INSERT INTO token (userID, tokenHash, expiresAt) VALUES (?, ?, ?)").run(
				user.id,
				tokenHash,
				createDate(new TimeSpan(1, "h")).getTime()
			);

			const transporter = nodemailer.createTransport({
				service: process.env.SERVICE,
				auth: {
					user: process.env.EMAIL,
					pass: process.env.EMAIL_PASSWORD
				}
			});
			console.log(process.env.EMAIL_PASSWORD);

			const mailOptions = {
				from: process.env.EMAIL,
				to: user.email,
				subject: "[DrownSafe] - Reset Password",
				html: `Please click on the link below to reset your password. If you didn't request this, please ignore this email and move on with your life.<br><br><a href="https://drownsafe.20050703.xyz/forget/${tokenID}">Click here!</a><br><br>Or you can copy the link and paste it into your browser: https://drownsafe.20050703.xyz/forget/${tokenID}`
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log("Email sent: " + info.response);
				}
			});
		} catch (e) {
			console.log(e);
			return fail(500, {
				message: "An unknown error occurred"
			});
		}

		return {
			message:
				"An email has been sent to the provided account. Please follow the instructions in the email."
		};
	}
};
