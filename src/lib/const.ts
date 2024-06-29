import { io, type Socket } from "socket.io-client";
import type { client_server, server_client } from "./types";

export const email_length = 256;
export const name_length = 32;
export const username_length = [3, 31] as const;
export const password_length = [6, 255] as const;
export const username_regex = /^[a-zA-Z0-9-_]+$/;
export const socket: Socket<server_client, client_server> = io();
