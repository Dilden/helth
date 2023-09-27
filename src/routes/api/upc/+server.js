import { error, json } from '@sveltejs/kit';
import {formatSource2 } from '$utils/sources.js';

export async function GET({ url }) {
  // SvelteKit server endpoints must return a Response object
  // https://kit.svelte.dev/docs/routing#server

  const barcode = url.searchParams.get('barcode');

  const response = fetch(source2(barcode), {
      method: 'GET',
      headers : {
        'Anonymous': 'true',
        'Device-Id': [...Array(16)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
      }
    })
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw error(404, `barcode ${barcode} not found @ 2nd source`);
    })
    .then(json => formatSource2(json))
    .then(data => json(data));

    return response;
}

const source2 = (code) => {
  return `https://apigw.inh0.net/v1/shopwell/v2/product?f=scan&upc=${code}`;
}
