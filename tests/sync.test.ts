import { expect, test } from '@playwright/test';

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
	test('accepts a POST request w/JSON', async ({ request }) => {
		const response = await request.post('/sync', {
			headers: { 'content-type': 'application/json' }
		});
		expect(response.status()).toBe(401); // Unauthorized
	});
	test('requires a stripe signature', async ({ request }) => {
		const response = await request.post('/sync', {
			headers: { 'content-type': 'application/json', 'stripe-signature': 'hasValue' }
		});
		expect(response.status()).toBe(200); // OK
	});
	// TODO
	test.skip('webhook exempt from CSRF', async ({ request }) => {
		// https://svelte.dev/docs/kit/configuration#csrf
		//
		// set trustedOrigins in config to allow Stripe to make POST request
		// May not be necessary as SvelteKit docs only specify content-type of:
		// application/x-www-form-urlencoded, multipart/form-data, and text/plain
		//
		// but Stripe only sends application/json so maybe not necessary?
	});
	test.skip('verifies request came from Stripe', async ({ request }) => {});
	test.skip('handles duplicate events', async ({ request }) => {});
	test.skip('listens for subscription renewal', async ({ request }) => {});
	test.skip('listens for subscription cancel', async ({ request }) => {});
	test.skip('listens for payment failure', async ({ request }) => {});
	test.skip('rejects old requests', async ({ request }) => {});
	test.skip('responds with 200 OK', async ({ request }) => {});
});
