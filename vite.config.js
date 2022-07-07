// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';


/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    VitePWA({ 
      sourceDir: './build,',
      outDir: './build',
      injectRegister: 'auto',
      devOptions: {
        enabled: true
      },
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,jpg,png}'],
      },
      manifest: {
        'background_color': '#213439',
        'theme_color': '#65c144',
        'name': 'helth app',
        'short_name': 'helth app',
        'display': 'standalone',
        'icons': [
          {
            'src': '/static/favicon-196.png',
            'sizes': '196x196',
            'type': 'image/png',
            'purpose': 'maskable any'
          }
        ]
      }
    })
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
  },
};

export default config;
