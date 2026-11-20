import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			// See https://svelte.dev/docs/kit/adapter-vercel for more information about the Vercel adapter.
			adapter: adapter({
				runtime: 'nodejs24.x'
			})
		})
	]
});
