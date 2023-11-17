import { expect, test } from '@playwright/test';

test('goal page has expected h2', async ({ page }) => {
  await page.goto('/goals/');
  expect(await page.textContent('h2')).toBe('🥇 goals');
});
