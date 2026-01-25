import { expect, test } from '@playwright/test';

test.describe('webhook handling', () => {
	test('accepts a POST request', async ({ request }) => {
		const response = await request.post('/api');
		expect(response.status()).toBe(200); // OK
	});
	test('fails a GET request', async ({ request }) => {
		const response = await request.get('/api');
		expect(response.status()).toBe(405); // Not Allowed
	});
});
