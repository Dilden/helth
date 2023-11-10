import { expect, test } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test('index page has expected h1', async ({ page }) => {
  await page.goto('/');
  expect(await page.textContent('h1')).toBe('helth app');
});

test('home page is accessible', async ({ page }) => {
  await page.goto('/');
  const a11yResults = await new AxeBuilder({ page }).analyze();
  expect(a11yResults.violations).toEqual([]);
})
