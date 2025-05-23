import { redirect } from '@sveltejs/kit';

import { db, type DatabaseWSI } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}

	const wsi = db.prepare<[], DatabaseWSI>('SELECT * FROM waterInfo').all();

	return {
		id: event.locals.user.id,
		username: event.locals.user.username,
		name: event.locals.user.name,
		email: event.locals.user.email,
		studentID: event.locals.user.studentID,
		wsi: wsi.map((wsi) => ({
			id: wsi.id,
			title: wsi.title,
			author: wsi.author,
			content: wsi.content
		}))
	};
};
