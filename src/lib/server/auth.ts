// * Import
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import { Lucia } from 'lucia';
import { db, type DatabaseUser } from './db';

// * Const
const adapter = new BetterSqlite3Adapter(db, {
	user: 'user',
	session: 'session'
});

// * Export
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: false
		}
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username,
			name: attributes.name,
			studentID: attributes.studentID,
			email: attributes.email,
			dob: attributes.dob
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<DatabaseUser, 'id'>;
	}
}
