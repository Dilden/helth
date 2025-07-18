import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: '200.html',
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		}),
		alias: {
			$utils: 'src/utils/',
			$stores: 'src/stores/'
		},
		csp: {
			mode: 'auto',
			directives: { 'script-src': ['self', 'static.cloudflareinsights.com'] }
		}
	},
	preprocess: vitePreprocess()
};

export default config;
