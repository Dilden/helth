import 'fake-indexeddb/auto';
import { expect, test } from '@playwright/test';

test.describe('add items dialog', () => {

  test.describe('inventory', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await page.getByRole('button', { name: '➕' }).click();
    })

    test('inventory is shown by default', async ({ page }) => {
      await expect(page.getByText('Saved Items')).toBeVisible();
    });

    test('add items to inventory form is hidden by default', async ({ page }) => {
      await expect(page.getByLabel('Title')).not.toBeVisible();
    });

    test('clicking Add Item shows form inputs', async ({ page }) => {
      await page.getByRole('button', { name: 'Add Item'}).click();
      await expect(page.getByLabel('Title')).toBeVisible();
    })

    test('clicking Add Nutrient adds more inputs to the form', async ({ page }) => {

      await page.getByRole('button', { name: 'Add Nutrient'}).click();
      await page.getByRole('button', { name: 'Add Nutrient'}).click();
      await expect(page.getByLabel('Nutrient 1')).toBeVisible();
      await expect(page.getByLabel('Nutrient 2')).toBeVisible();
      await expect(page.getByLabel('Nutrient 3')).toBeVisible();
    })

    // test.skip('scanning item adds it to inventory', async ({ page }) => {

    // })

    // test.skip('add item in inventory to daily total', async ({ page }) => {
    //   openDialog(page);
    //   // await page.getByRole('button', {name: '🖉'}).filter()
    // })
    // test.skip('edit item in inventory', async ({ page }) => {
    //   openDialog(page);
    //   // await page.getByRole('button', {name: '🖉'}).filter()
    // })
    // test.skip('delete item in inventory', async ({ page }) => {
    //   openDialog(page);
    //   // await page.getByRole('button', {name: '🖉'}).filter()
    // })
    // test.skip('user can manually add an item to inventory', () => {
    //    
    // })
  })

  // test.describe('recipes', () => {
  //   test.skip('user is able to add an inventory item to a recipe', async ({ page }) => {
  //     openDialog(page);
  //     // await page.getByRole('button', {name: '🖉'}).filter()
  //   })

  // })
  // test.describe('scanner', () => {
  //   test.skip('scanning a barcode adds it to the inventory', async ({ page }) => {
  //     openDialog(page);
  //     // await page.getByRole('button', {name: '🖉'}).filter()
  //   })
  // })
})
