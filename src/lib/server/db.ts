// * Import
import sqlite from "better-sqlite3";

export interface DatabaseUser {
	id: string;
	username: string;
	password: string;
	name: string;
	studentID: string;
	dob: string;
	email: string;
}

export interface DatabaseToken {
	userID: string;
	expiresAt: number;
	tokenHash: string;
}

export interface DatabaseWSI {
	id: string;
	title: string;
	author: string;
	mimetype: string;
	data: string;
	content: string;
}

export const db = sqlite("src/lib/server/main.db");

db.exec(`CREATE TABLE IF NOT EXISTS user (
	id TEXT NOT NULL PRIMARY KEY,
	username TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	'name' TEXT,
	studentID TEXT,
	dob TEXT,
	email TEXT UNIQUE
)`);

db.exec(`CREATE TABLE IF NOT EXISTS session (
 	id TEXT NOT NULL PRIMARY KEY,
 	expires_at INTEGER NOT NULL,
 	user_id TEXT NOT NULL,
 	FOREIGN KEY (user_id) REFERENCES user(id)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS token (
	userID TEXT NOT NULL,
	expiresAt INTEGER NOT NULL,
	tokenHash TEXT NOT NULL,
	FOREIGN KEY (userID) REFERENCES user(id)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS waterInfo (
	id TEXT NOT NULL PRIMARY KEY,
	title TEXT NOT NULL,
	author TEXT,
	mimetype TEXT,
	'data' BLOB,
	content TEXT NOT NULL
)`);
