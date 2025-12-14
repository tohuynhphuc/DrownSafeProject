import { publish } from '$app/server';
import { admin, guard } from '$lib/const';
import { validateSessionToken } from '$lib/server/session';
import type { data_schema } from '$lib/types';
import { error } from '@sveltejs/kit';
import { pack, unpack } from 'msgpackr';
import type { z } from 'zod/v4';
import type { Socket } from './$types';

export const socket: Socket = {
	upgrade(event) {
		const session_token = event.cookies.get('session');
		if (!session_token) error(401, 'Unauthorized');
		const { user } = validateSessionToken(session_token);
		if (!user) error(401, 'Unauthorized');
		event.context.username = user.username;
	},
	open(peer) {
		peer.websocket.binaryType = 'arraybuffer';
		if (peer.context.username === admin) peer.subscribe('admin');
		if (peer.context.username === guard) peer.subscribe('guard');
	},
	message(peer, message) {
		try {
			const data = unpack(Buffer.from(message.data as ArrayBuffer));
			send_to_topic('admin', data);
			send_to_topic('guard', data);
		} catch (e) {
			peer.send(e);
			console.log(e);
		}
	},
	close(peer, details) {
		console.log('close', peer.context.username, details);
	},
	error(peer, error) {
		console.error('error', error);
	}
};

function send_to_topic(topic: string, data: z.infer<typeof data_schema>) {
	publish(topic, pack(data));
}
