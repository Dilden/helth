import { formatSource1, formatSource2 } from '$utils/nutrients';

export async function GET({ url }) {
  // SvelteKit server endpoints must return a Response object
  // https://kit.svelte.dev/docs/routing#server

  const barcode = url.searchParams.get('barcode');

  // attempt 1st data source
  const res = await fetch(source1(barcode))
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(`barcode ${barcode} not found @ 1st source`);
    })
    .then(json => formatSource1(json.data.product_by_barcode.tcin))
    .then(data => JSON.stringify(data))
    .then(data => new Response(data))
    .catch(error => console.error(error));

  if(res) {
    return res;
  }

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
    .then(json => formatSource2(json.data.product_details.nutrition_labels))
    .then(data => JSON.stringify(data))
    .then(data => new Response(data))
    .catch(error => console.error(error));

  if(res2) {
    return res2;
  }

  // all failed, no data found for barcode
  const error = new Response(new String(), {status: 404, statusText: 'Barcode not found'});
  return error;
}

const source1 = (code) => {
  return `https://redsky.target.com/redsky_aggregations/v1/apps/product_from_barcode_v1?barcode=${code}&pricing_store_id=530&key=5d546952f5059b16db4aa90913e56d09d3ff2aa4`;
}

const source2 = (code) => {
  return `https://apigw.inh0.net/v1/shopwell/v2/product?f=scan&upc=${code}`;
}
