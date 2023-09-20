import { error } from '@sveltejs/kit';
import {formatSource2 } from '$utils/sources.js';

export async function GET({ url }) {
  // SvelteKit server endpoints must return a Response object
  // https://kit.svelte.dev/docs/routing#server

  const barcode = url.searchParams.get('barcode');

  // attempt 2nd data source
  const res2 = fetch(source2(barcode), {
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
      throw new Error(`barcode ${barcode} not found @ 2nd source`);
    })
    .then(json => formatSource2(json))
    .then(data => JSON.stringify(data))
    .then(data => new Response(data))
    .catch(error => console.error(error));

  if(res2) {
    return res2;
  }

  // all failed, no data found for barcode
  return error(404, { message: 'Barcode not found' });
}

const source2 = (code) => {
  return `https://apigw.inh0.net/v1/shopwell/v2/product?f=scan&upc=${code}`;
}
