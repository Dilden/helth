import adapter from '@sveltejs/adapter-node';
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
        vite: {
            resolve: {
                alias: {
                    // set an alias so images can be dynamically imported
                    $static: resolve('static/'),
                    $components: resolve('src/components/'),
                    $utils: resolve('src/utils/')
                }
            }
        }
    }
};

export default config;
