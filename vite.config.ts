import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import server from "./src/lib/server";
export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: "server",
			configureServer({ httpServer }) {
				if (!httpServer) return;
				server(httpServer);
			}
		}
	],
	build: { target: "es2015" },
	//server: { hmr: false },
	optimizeDeps: { exclude: ["@node-rs"] }
});
