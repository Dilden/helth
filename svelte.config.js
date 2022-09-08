import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
        fallback: '200.html'
    }),
    trailingSlash: 'always',
  }
};

export default config;
