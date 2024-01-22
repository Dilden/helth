# helth app

Helth app aims to be a minimalist web app for tracking calories, sodium, and water intake. It's a PWA built with [`SvelteKit`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte). Helth app doesn't use any third-party services for managing your data. Instead, your data is stored locally on your device. It also has a sweet barcode scanner that can magically ✨ download packaged food items and the nutrients for that particular food by connecting you to the [Open Food Facts](https://world.openfoodfacts.org/) API.

## Getting started developing helth app

+ Clone this [repository](https://github.com/Dilden/helth)
+ `npm install`
+ `npm run dev`

## Building

To create a production version of helth app:

```bash
npm run build
```

Production builds can be previewed with `npm run preview`. Helth app currently uses the [Cloudflare adapter](https://kit.svelte.dev/docs/adapter-cloudflare) but aims to be a static web application meaning it could be host from anywhere that can serve HTML, CSS, and JS files. This can be accomplished switching out the adapter with the SvelteKit [static adapter](https://kit.svelte.dev/docs/adapter-static).

## Structure
Various reusable components are located in `src/lib/`. All data is stored locally in the user's browser and is managed via `src/stores/stores` with database connections handled at `src/stores/db`. Pages routes are found in `src/routes/` and utility classes for transforming data can be found in `src/utils/`.

## 3rd Party Tools
This development of this app is made easier by utilizing the following tools:
+ [SvelteKit](https://github.com/sveltejs/kit/)
+ [Chart.js](https://www.chartjs.org/)
+ [zxing-js](https://github.com/zxing-js/library)
+ [Vite PWA](https://github.com/vite-pwa/vite-plugin-pwa)
+ [Dexie](https://github.com/dexie/Dexie.js/)

