/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // disable ssr for each request
    const response = await resolve(event, { ssr: false });
    response.headers.set('x-custom-header', 'potato');

    return response;
}
