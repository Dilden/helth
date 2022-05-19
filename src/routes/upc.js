export async function get({ url }) {
    const code = url.searchParams.get('barcode');
    const req = new Request(
        `https://redsky.target.com/redsky_aggregations/v1/apps/product_from_barcode_v1?barcode=${code}&pricing_store_id=530&key=5d546952f5059b16db4aa90913e56d09d3ff2aa4`,
        {
            method: 'GET'
        }
    );

    const res = await fetch(req);
    if (res) {
        return {
            body: res.body
        };
    }

    return {
        status: 404
    };
}
