import adapter from '@sveltejs/adapter-static';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({
            fallback: '200.html'
        }),
        prerender: {
            default: true
        },
        trailingSlash: 'always',
        paths: {
            base: '/helth'
        },
        vite: {
            resolve: {
                alias: {
                    // set an alias so images can be dynamically imported
                    $static: resolve('static/')
                }
            }
        }
    }
};

export default config;
