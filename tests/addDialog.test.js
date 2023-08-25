import { expect, test } from '@playwright/test';

const openDialog = async ( page ) => {
  await page.goto('/');
  await page.getByRole('button', { name: '➕' }).click();
}

test.describe('add items dialog', () => {

  test('inventory is shown by default', async ({ page }) => {
    openDialog(page);
    await expect(page.getByText('Saved Items')).toBeVisible();
  });
})
