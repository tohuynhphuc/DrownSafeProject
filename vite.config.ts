import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: { allowedHosts: ['drownsafe.20050703.xyz'] },
	build: { rollupOptions: { external: ['@node-rs/argon2', 'better-sqlite3'] } }
});
