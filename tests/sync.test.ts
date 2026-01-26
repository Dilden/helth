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
});
