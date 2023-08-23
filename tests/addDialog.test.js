import { expect, test } from '@playwright/test';
// /import { getInventory, addInventory } from '../src/stores/db.js';

const openDialog = async ( page ) => {
  await page.goto('/');
  await page.getByRole('button', { name: '➕' }).click();
}

test('add dialog shows inventory, recipes, and scan tabs', async ({ page }) => {
  openDialog(page);
  await expect(page.getByRole('button', { name: 'Inventory' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Recipes' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Scan' })).toBeVisible();
});

test('inventory is shown by default', async ({ page }) => {
  openDialog(page);
  await expect(page.getByText('Saved Items')).toBeVisible();
});
