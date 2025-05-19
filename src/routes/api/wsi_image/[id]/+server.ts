import { db, type DatabaseWSI } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	if (!event.params.id) return error(404);

	const avatar = db
		.prepare<string, DatabaseWSI>('SELECT * FROM waterInfo WHERE id = ?')
		.get(event.params.id);

	if (!avatar) error(404);

	event.setHeaders({
		'Content-Type': avatar.mimetype,
		'Cache-Control': 'public, max-age=600'
	});

	return new Response(new Blob([avatar.data], { type: avatar.mimetype }));
};
