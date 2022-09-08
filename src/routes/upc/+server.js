import { facts } from '$utils/nutrients';

export async function GET({ url }) {
  const code = url.searchParams.get('barcode');

  const res = await fetch(`https://redsky.target.com/redsky_aggregations/v1/apps/product_from_barcode_v1?barcode=${code}&pricing_store_id=530&key=5d546952f5059b16db4aa90913e56d09d3ff2aa4`)
  .then(response => response.json())
  .then(json => facts(json.data.product_by_barcode.tcin));

  if(res) {
    return new Response(res.blob());
  }

  const error = new Response(new String(), {status: 404, statusText: 'UPC not found'});
  return error;
}
