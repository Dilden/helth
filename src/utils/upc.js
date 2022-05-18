function upcLookupOne(upc) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    headers.append(
        'REDSKY-API-KEY',
        '5d546952f5059b16db4aa90913e56d09d3ff2aa4'
    );
    headers.append('Host', 'redsky.target.com');

    const req = new Request(
        `https://redsky.target.com/redsky_aggregations/v1/apps/product_from_barcode_v1?barcode=${upc}&pricing_store_id=530&key=5d546952f5059b16db4aa90913e56d09d3ff2aa4`,
        {
            method: 'GET',
            headers: headers,
            mode: 'no-cors'
        }
    );
    return req;
}

export const lookup = async (upc) => {
    return fetch(upcLookupOne(upc)).then((response) => response.json);
};
