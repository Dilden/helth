import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), basicSsl()],
  server: {
    fs: {
      allow: ['static']
    },
    https: true,
    port: 3000,
    strictPort: true
  },
  resolve: {
    alias: {
      // set an alias so images can be dynamically imported
      $static: path.resolve('./static'),
      $components: path.resolve('./src/components'),
      $utils: path.resolve('./src/utils'),
      $stores: path.resolve('./src/stores')
    }
  },
  ssr: {
    noExternal: ['chart.js']
  }
};
export default config; 
