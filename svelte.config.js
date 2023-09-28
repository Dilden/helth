import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: '200.html',
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
    })
  }
};

export default config;
