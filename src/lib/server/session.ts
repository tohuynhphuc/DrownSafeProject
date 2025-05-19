import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import type { RequestEvent } from '@sveltejs/kit';
import { db } from './db.js';

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export function createSession(token: string, user_id: string): Session {
	const session_id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: session_id,
		user_id: user_id,
		expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	db.prepare<[string, string, number]>(
		'INSERT INTO session (id, user_id, expires_at) VALUES (?, ?, ?)'
	).run(session.id, session.user_id, Math.floor(session.expires_at.getTime() / 1000));

	return session;
}

export function validateSessionToken(token: string): SessionValidationResult {
	const session_id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const row = db
		.prepare<
			string,
			{
				id: string;
				user_id: string;
				expires_at: number;
				username: string;
				name: string;
				studentID: string;
				dob: string;
				email: string;
			}
		>(
			'SELECT session.id, session.user_id, session.expires_at, user.username, user.name, user.studentID, user.dob, user.email FROM session INNER JOIN user ON user.id = session.user_id WHERE session.id = ?'
		)
		.get(session_id);
	if (!row) {
		return { session: null, user: null };
	}

	const session: Session = {
		id: row.id,
		user_id: row.user_id,
		expires_at: new Date(row.expires_at * 1000)
	};
	const user: Omit<User, 'password'> = {
		id: row.user_id,
		username: row.username,
		name: row.name,
		studentID: row.studentID,
		dob: row.dob,
		email: row.email
	};
	if (Date.now() >= session.expires_at.getTime()) {
		db.prepare<string>('DELETE FROM session WHERE id = ?').run(session.id);
		return { session: null, user: null };
	}
	if (Date.now() >= session.expires_at.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		db.prepare<[number, string]>('UPDATE session SET expires_at = ? WHERE id = ?').run(
			Math.floor(session.expires_at.getTime() / 1000),
			session.id
		);
	}
	return { session, user };
}

export function invalidateSession(session_id: string): void {
	db.prepare<string>('DELETE FROM session WHERE id = ?').run(session_id);
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expires_at: Date): void {
	event.cookies.set('session', token, {
		httpOnly: true,
		sameSite: 'lax',
		expires: expires_at,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set('session', '', {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 0,
		path: '/'
	});
}

export type SessionValidationResult =
	| { session: Session; user: Omit<User, 'password'> }
	| { session: null; user: null };

export interface Session {
	id: string;
	user_id: string;
	expires_at: Date;
}

export interface User {
	id: string;
	username: string;
	password: string;
	name: string;
	studentID: string;
	dob: string;
	email: string;
}
