import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { VitePWA } from 'vite-plugin-pwa';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    basicSsl(),
    VitePWA({
      registerType: 'prompt',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      includeAssets: ['favicon.png', 'apple-touch-icon.png', 'favicon-300.png'],
      manifest: {
        name: 'helth app',
        short_name: 'HelthApp',
        description: 'health tracking app',
        theme_color: '#213439',
        icons: [
          {
            src: 'static/favicon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'static/favicon-192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    fs: {
      allow: ['static']
    },
    https: true,
    port: 3000,
    strictPort: true,
    hmr: true // set to 'false' for testing on old iOS devices
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
