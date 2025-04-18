import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { svelteTesting } from '@testing-library/svelte/vite';

/** @type {import('vite').UserConfig} */
const config = {
	test: {
		css: true,
		globals: true,
		environment: 'jsdom',
		environmentOptions: {
			jsdom: {
				console: true
			}
		},
		include: ['src/**/*.{test,spec}.{js,ts}'],
		reporter: 'verbose',
		setupFiles: ['./src/vitest/cleanupDom', './vitest-setup-client.ts']
	},
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version)
	},
	plugins: [
		sveltekit(),
		svelteTesting(),
		// // enabling basicSsl plugin breaks tests
		// (process.env.NODE_ENV === 'development' || 'preview' ? basicSsl() : [] ),
		process.env.NODE_ENV === 'development' ? basicSsl() : [],
		SvelteKitPWA({
			registerType: 'prompt',
			devOptions: {
				enabled: true
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html}'],
				inlineWorkboxRuntime: true
			},
			includeAssets: [
				'icon-512.png',
				'favicon-512.png',
				'apple-touch-icon.png',
				'favicon-300.png',
				'favicon-196.png',
				'icon-192.png',
				'favicon-192.png',
				'favicon.png',
				'beep.wav'
			],
			manifest: {
				name: 'helth.app',
				short_name: 'helth.app',
				description: 'Scan foods, count calories, track water and more!',
				theme_color: '#213439',
				background_color: '#213439',
				start_url: '/',
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
		https: process.env.NODE_ENV === 'development' ? true : false,
		port: 3000,
		strictPort: true,
		hmr: true, // set to 'false' for testing on old iOS devices,
		proxy: {}
	},
	// // enabling HTTPS in basicSsl plugin breaks tests
	// preview: {
	//   https: true
	// },
	resolve: {
		alias: {
			$utils: path.resolve('./src/utils'),
			$stores: path.resolve('./src/stores'),
			$vitest: path.resolve('./src/vitest')
		}
	},
	ssr: {
		noExternal: ['chart.js']
	}
};
export default config;
