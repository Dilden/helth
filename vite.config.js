// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';


/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
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
};

export default config;
