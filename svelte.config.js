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
      '$utils': 'src/utils/'
    }
  },
  preprocess: vitePreprocess()
};

export default config;
