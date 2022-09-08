import path from 'path';

// vite.config.js
export default {
  server: {
      fs: {
          allow: ['static']
      }
  },
  preview: {
    port: 3001
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
}
