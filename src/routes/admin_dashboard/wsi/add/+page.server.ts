import { fail, redirect } from "@sveltejs/kit";

import { admin } from "$lib/const";
import { db } from "$lib/server/db";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user || event.locals.user.username != admin) {
		redirect(302, "/login");
		return {};
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

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const title = formData.get("title");
		const author = formData.get("author");
		const image = formData.get("image");
		const content = formData.get("content");

		if (
			typeof title != "string" ||
			typeof author != "string" ||
			typeof content != "string" ||
			!(image instanceof File)
		) {
			return fail(400);
		}

		try {
			db.prepare(
				"INSERT INTO waterInfo (id, title, author, mimetype, data, content) VALUES(?, ?, ?, ?, ?, ?)"
			).run(
				Date.now().toString(),
				title,
				author,
				image?.type,
				Buffer.from(await image?.arrayBuffer()),
				content
			);
			return { message: "Success!" };
		} catch (e) {
			console.log(e);
			return fail(500, {
				message: "An unknown error occurred"
			});
		}
	}
};
