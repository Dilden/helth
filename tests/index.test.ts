import 'fake-indexeddb/auto';
import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
  await page.goto('/');
  expect(await page.textContent('h1')).toBe('helth.app');
});

test('current date is shown', async ({ page }) => {

  const dateObj: Date = new Date();
  const format: string = dateObj.getMonth() + 1 + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();

  await page.goto('/');
  expect(await page.textContent('h3')).toBe(format);
})
