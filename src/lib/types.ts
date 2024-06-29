// * Import

// * Export
export interface client_server {
	gps(longtitude: number, latitude: number): void;
	login(sessionId?: string): void;
}

export interface server_client {
	gps(longtitude: number, latitude: number): void;
}

export interface data {}
