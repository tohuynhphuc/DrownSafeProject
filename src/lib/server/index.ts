import type http from "http";
import type { Http2SecureServer } from "http2";
import { Server } from "socket.io";
import { type client_server, type server_client } from "../types";
import { lucia } from "./auth";

export default function (server: http.Server | Http2SecureServer) {
	const io = new Server<client_server, server_client>(server);

	io.on("connection", (socket) => {
		socket.on("login", async (sessionId) => {
			if (!sessionId) return;
			const { user } = await lucia.validateSession(sessionId);
			if (!user) return; // socket.emit("error", "login", "Invalid Session ID!")

			socket.data.username = user.username;
			if (socket.data.username === "administration") socket.join("admin");
			if (socket.data.username === "guard") socket.join("guard");
		});

		socket.on("gps", (longtitude, latitude) => {
			io.to(["guard", "admin"]).emit("gps", longtitude, latitude);
			console.log(longtitude, latitude);
		});
	});
}
