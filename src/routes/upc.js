import { calories } from '$utils/nutrients';

export async function get({ url }) {
  const code = url.searchParams.get('barcode');

  const res = await fetch(`https://redsky.target.com/redsky_aggregations/v1/apps/product_from_barcode_v1?barcode=${code}&pricing_store_id=530&key=5d546952f5059b16db4aa90913e56d09d3ff2aa4`)
  .then(res => res.json())
  .then(json => calories(json.data.product_by_barcode.tcin));

  if(res) {
    return {
      body: res
    };
  }

  return {
      status: 404
  };
}
