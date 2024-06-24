// * Import
import sqlite from 'better-sqlite3';

export interface DatabaseUser {
	id: string;
	username: string;
	password: string;
	name: string;
	studentID: string;
	dob: string;
	email: string;
}

export const db = sqlite('src/lib/server/main.db');

db.exec(`CREATE TABLE IF NOT EXISTS user (
	id TEXT NOT NULL PRIMARY KEY,
	username TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	'name' TEXT,
	studentID TEXT,
	dob TEXT,
	email TEXT
)`);

db.exec(`CREATE TABLE IF NOT EXISTS session (
 id TEXT NOT NULL PRIMARY KEY,
 expires_at INTEGER NOT NULL,
 user_id TEXT NOT NULL,
 FOREIGN KEY (user_id) REFERENCES user(id)
)`);
