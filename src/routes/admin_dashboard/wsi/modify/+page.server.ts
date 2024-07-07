import { fail, redirect } from "@sveltejs/kit";

import { admin } from "$lib/const";
import { db, type DatabaseWSI } from "$lib/server/db";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user || event.locals.user.username != admin) {
		return redirect(302, "/login");
	}

	const wsi = db.prepare("SELECT * FROM waterInfo").all() as DatabaseWSI[];

	return {
		id: event.locals.user.id,
		username: event.locals.user.username,
		name: event.locals.user.name,
		email: event.locals.user.email,
		studentID: event.locals.user.studentID,
		sessionId: event.locals.session?.id,
		wsi: wsi.map((wsi) => ({
			id: wsi.id,
			title: wsi.title,
			author: wsi.author,
			content: wsi.content
		}))
	};
};

export const actions: Actions = {
	modify: async (event) => {
		const formData = await event.request.formData();
		const id = formData.get("id");
		const title = formData.get("title");
		const author = formData.get("author");
		const image = formData.get("image");
		const content = formData.get("content");

		if (
			typeof id != "string" ||
			typeof title != "string" ||
			typeof author != "string" ||
			typeof content != "string"
		) {
			return fail(400);
		}

		try {
			db.prepare("UPDATE waterInfo SET title = ?, author = ?, content = ? WHERE id = ?").run(
				title,
				author,
				content,
				id
			);
			if (image instanceof File && image.size > 0) {
				db.prepare("UPDATE waterInfo SET mimetype = ?, data = ? WHERE id = ?").run(
					image?.type,
					Buffer.from(await image?.arrayBuffer()),
					id
				);
			}
			return { message: "Success!" };
		} catch (e) {
			console.log(e);
			return fail(500, {
				message: "An unknown error occurred"
			});
		}
	},

	deletePost: async (event) => {
		const formData = await event.request.formData();
		const id = formData.get("id");

		if (typeof id != "string") {
			return fail(400);
		}

		try {
			db.prepare("DELETE FROM waterInfo WHERE id = ?").run(id);
			return { message: "Success!" };
		} catch (e) {
			console.log(e);
			return fail(500, {
				message: "An unknown error occurred"
			});
		}
	}
};
