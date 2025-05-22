import { expect, test } from '@playwright/test';

test.describe('index', () => {
	test.describe.configure({ mode: 'serial' });
	let page;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		await page.goto('/');
		await page.waitForTimeout(2000);

		// persistent storage prompt
		if (
			await page
				.locator('li')
				.filter({ hasText: "Don't lose your data! Make storage persistent now? Yes No" })
				.isVisible()
		) {
			await page
				.locator('li')
				.filter({ hasText: "Don't lose your data! Make storage persistent now? Yes No" })
				.getByTitle('Yes')
				.click();
		}
		// offline ready prompt
		if (await page.locator('.pwa-toast').isVisible()) {
			await page.locator('.pwa-toast').getByRole('button', { name: 'Close' }).click();
		}
	});

	test('index page has expected title h1', async () => {
		expect(await page.textContent('h1')).toBe('helth.app');
	});

	test('current date is shown', async () => {
		const dateObj = new Date();
		const format = dateObj.getMonth() + 1 + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();

		expect(await page.textContent('h3')).toBe(format);
	});
});
