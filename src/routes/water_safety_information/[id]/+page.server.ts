import { redirect } from '@sveltejs/kit';

import { db, type DatabaseWSI } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}

	const wsi = db
		.prepare<string, DatabaseWSI>('SELECT * FROM waterInfo WHERE id = ?')
		.get(event.params.id);

	return {
		id: event.locals.user.id,
		username: event.locals.user.username,
		name: event.locals.user.name,
		email: event.locals.user.email,
		studentID: event.locals.user.studentID,
		wsi: {
			id: wsi?.id,
			title: wsi?.title,
			author: wsi?.author,
			content: wsi?.content
		}
	};
};
