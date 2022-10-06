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
      includeAssets: ['icon-512.png', 'favicon-512.png', 'apple-touch-icon.png', 'favicon-300.png', 'favicon-196.png', 'icon-192.png', 'favicon-192.png', 'favicon.png', ],
      manifest: {
        name: 'helth app',
        short_name: 'helth app',
        description: 'its uh, one of those health tracking app things',
        theme_color: '#213439',
        background_color: '#213439',
        icons: [
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'favicon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'favicon-196.png',
            sizes: '196x196',
            type: 'image/png'
          },
          {
            src: 'favicon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'favicon-180.png',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: 'favicon.png',
            sizes: '32x32',
            type: 'image/png'
          }
        ]
      },
      display: 'fullscreen'
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
    } },
  ssr: {
    noExternal: ['chart.js']
  }
};
export default config; 
