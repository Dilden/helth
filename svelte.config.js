import adapter from '@sveltejs/adapter-node';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

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
          plugins: [
            VitePWA({ registerType: 'autoUpdate'})
          ],
          server: {
              fs: {
                  allow: ['static']
              }
          },
          resolve: {
              alias: {
                  // set an alias so images can be dynamically imported
                  $static: path.resolve('./static'),
                  $components: path.resolve('./src/components'),
                  $utils: path.resolve('./src/utils'),
                  $stores: path.resolve('./src/stores')
              }
          }
        }
    }
};

export default config;
