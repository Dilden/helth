import 'fake-indexeddb/auto';
import { expect, test } from '@playwright/test';

test.describe('index', () => {
	let page;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		await page.goto('/');
		await page
			.locator('li')
			.filter({ hasText: "Don't lose your data! Make storage persistent now? Yes No" })
			.getByTitle('Yes')
			.click();
	});

	test('index page has expected title h1', async () => {
		expect(await page.textContent('h1')).toBe('helth.app');
	});

	test('current date is shown', async () => {
		const dateObj: Date = new Date();
		const format: string =
			dateObj.getMonth() + 1 + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();

		expect(await page.textContent('h3')).toBe(format);
	});
});
