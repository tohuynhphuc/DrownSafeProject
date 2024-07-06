import { io, type Socket } from "socket.io-client";
import type { client_server, server_client } from "./types";

export const email_length = 256;
export const name_length = 32;
export const username_length = [3, 31] as const;
export const password_length = [6, 255] as const;
export const username_regex = /^[a-zA-Z0-9-_]+$/;
export const socket: Socket<server_client, client_server> = io();
export const admin = "administration";
export const guard = "guard";

export const vguBoundingBox: [number, number][] = [
	[11.1107, 106.62],
	[11.1107, 106.6103],
	[11.1043, 106.6103],
	[11.1043, 106.62]
];

export const riverBoundingBox: [number, number][] = [
	[11.109436, 106.612503],
	[11.109127, 106.612619],
	[11.108832, 106.612999],
	[11.108767, 106.61321],
	[11.108767, 106.613445],
	[11.109451, 106.612497],
	[11.109264, 106.612541],
	[11.109128, 106.612622],
	[11.108984, 106.612764],
	[11.108882, 106.612897],
	[11.108823, 106.613022],
	[11.108769, 106.6132],
	[11.108759, 106.61331],
	[11.108759, 106.613384],
	[11.108766, 106.613444],
	[11.109977, 106.616817],
	[11.110492, 106.618281],
	[11.110597, 106.618467],
	[11.110599, 106.618471],
	[11.110631, 106.618516],
	[11.110251, 106.61869],
	[11.110239, 106.618624],
	[11.11024, 106.61855],
	[11.11022, 106.618452],
	[11.11003, 106.61809],
	[11.109234, 106.615846],
	[11.109292, 106.616012],
	[11.109229, 106.615797],
	[11.109137, 106.615576],
	[11.109098, 106.615462],
	[11.109074, 106.615405],
	[11.109056, 106.615363],
	[11.109013, 106.615217],
	[11.109004, 106.615188],
	[11.108948, 106.615041],
	[11.108897, 106.614911],
	[11.10884, 106.614762],
	[11.108774, 106.614577],
	[11.10872, 106.614437],
	[11.108678, 106.614322],
	[11.108645, 106.614208],
	[11.108601, 106.614071],
	[11.108545, 106.613872],
	[11.108507, 106.613741],
	[11.10848, 106.613649],
	[11.108454, 106.613219],
	[11.108502, 106.612959],
	[11.108599, 106.612735],
	[11.108855, 106.612416],
	[11.108957, 106.612333],
	[11.109132, 106.612265],
	[11.109168, 106.61225],
	[11.109195, 106.612236],
	[11.109235, 106.612219],
	[11.109256, 106.612209],
	[11.109331, 106.612171]
];

export const fake_riverBoundingBox: [number, number][] = [
	[11.107524, 106.61269],
	[11.107566, 106.612951],
	[11.107368, 106.61296],
	[11.107329, 106.612723]
];

export const dangerZones: [number, number][][] = [riverBoundingBox];
export const fake_dangerZones: [number, number][][] = [fake_riverBoundingBox];

export const markerDangerOptions: {
	iconUrl: string;
	iconSize: [number, number];
	iconAnchor: [number, number];
	popupAnchor: [number, number];
} = {
	iconUrl: "/marker_danger.svg",
	iconSize: [50, 50],
	iconAnchor: [25, 40],
	popupAnchor: [0, -30]
};

export const markerSafeOptions: {
	iconUrl: string;
	iconSize: [number, number];
	iconAnchor: [number, number];
	popupAnchor: [number, number];
} = {
	iconUrl: "/marker_safe.svg",
	iconSize: [50, 50],
	iconAnchor: [25, 40],
	popupAnchor: [0, -30]
};
