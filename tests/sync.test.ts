import { expect, test } from '@playwright/test';

// Note: These tests cannot cover all scenarios due to dependency on Stripe's API
// Further testing must be completed using that CLI tool
// run
//
// stripe listen --forward-to https://localhost:3000/sync --skip-verify
//
// to test in local dev env

test.describe('fails non-POST HTTP methods', () => {
	test('fails a GET request', async ({ request }) => {
		const response = await request.get('/sync');
		expect(response.status()).toBe(405); // Not Allowed
	});
	test('fails a PUT', async ({ request }) => {
		const response = await request.put('/sync');
		expect(response.status()).toBe(405); // Not Allowed
	});
	test('fails a PATCH', async ({ request }) => {
		const response = await request.patch('/sync');
		expect(response.status()).toBe(405); // Not Allowed
	});
	test('fails a DELETE', async ({ request }) => {
		const response = await request.delete('/sync');
		expect(response.status()).toBe(405); // Not Allowed
	});
});

test.describe('error handling', () => {
	test('fails a POST request w/form-data', async ({ request }) => {
		const response = await request.post('/sync', {
			headers: { 'content-type': 'multipart/form-data;' }
		});
		expect(response.status()).toBe(403); // Not allowed
	});
	test('requires a stripe signature', async ({ request }) => {
		const response = await request.post('/sync', {
			headers: {
				'content-type': 'application/json; charset=utf-8',
				'stripe-signature': 'ThisDoesNotMatterForTesting'
			}
		});
		expect(response.status()).toBe(200);
		expect(await response.json()).toStrictEqual({ received: false });
	});
	// TODO
	// Need to use Stripe CLI to test the rest of these scenarios
	// since Playwright doesn't support mocking an imported module
	test.skip('handles duplicate events', async ({ request }) => { });
	test.skip('listens for subscription renewal', async ({ request }) => { });
	test.skip('listens for subscription cancel', async ({ request }) => { });
	test.skip('listens for payment failure', async ({ request }) => { });
	test.skip('rejects old requests', async ({ request }) => { });
	test.skip('responds with 200 OK', async ({ request }) => { });
	// test.skip('webhook exempt from CSRF', async ({ request }) => {
	// not needed as SvelteKit doesn't apply CSRF to application/json requests
	// https://svelte.dev/docs/kit/configuration#csrf
	//
	// set trustedOrigins in config to allow Stripe to make POST request
	// May not be necessary as SvelteKit docs only specify content-type of:
	// application/x-www-form-urlencoded, multipart/form-data, and text/plain
	//
	// but Stripe only sends application/json so maybe not necessary?
	// });

	// test('verifies request came from Stripe', async ({ request }) => {
	//
	// });
});
