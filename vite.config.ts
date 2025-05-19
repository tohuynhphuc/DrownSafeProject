import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import server from './src/lib/server';
export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: 'server',
			configureServer({ httpServer }) {
				if (!httpServer) return;
				server(httpServer);
			}
		}
	],
	server: {
		allowedHosts: ['drownsafe.20050703.xyz'],
		watch: { ignored: ['**/log.txt', '**/main.db'] }
	}
});
