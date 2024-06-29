// * Import

// * Export
export interface client_server {
	gps(username: string, longtitude: number, latitude: number): void;
	login(sessionId?: string): void;
}

export interface server_client {
	gps(username: string, longtitude: number, latitude: number): void;
}

export interface data {}
