import { expect, test } from '@playwright/test';

const openDialog = async ( page ) => {
  await page.goto('/');
  await page.getByRole('button', { name: '➕' }).click();
}

test.describe('add items dialog', () => {

  test.describe('inventory', () => {

    test('inventory is shown by default', async ({ page }) => {
      openDialog(page);
      await expect(page.getByText('Saved Items')).toBeVisible();
    });

    test.skip('scanning item adds it to inventory', async ({ page }) => {

    })

    test.skip('add item in inventory to daily total', async ({ page }) => {
      openDialog(page);
      // await page.getByRole('button', {name: '🖉'}).filter()
    })
    test.skip('edit item in inventory', async ({ page }) => {
      openDialog(page);
      // await page.getByRole('button', {name: '🖉'}).filter()
    })
    test.skip('delete item in inventory', async ({ page }) => {
      openDialog(page);
      // await page.getByRole('button', {name: '🖉'}).filter()
    })
    test.skip('user can manually add an item to inventory', () => {
       
    })
  })

  test.describe('recipes', () => {
    test.skip('user is able to add an inventory item to a recipe', async ({ page }) => {
      openDialog(page);
      // await page.getByRole('button', {name: '🖉'}).filter()
    })

  })
  test.describe('scanner', () => {
    test.skip('scanning a barcode adds it to the inventory', async ({ page }) => {
      openDialog(page);
      // await page.getByRole('button', {name: '🖉'}).filter()
    })
  })
})
