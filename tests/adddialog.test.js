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
      await expect(page.getByLabel('Name')).not.toBeVisible();
    });

    test('clicking Add Item shows form inputs', async ({ page }) => {
      await page.getByRole('button', { name: 'Add Item'}).click();
      await expect(page.getByLabel('Name')).toBeVisible();
      await expect(page.getByLabel('Added Sugars')).toBeVisible();
      await expect(page.getByLabel('Iron')).toBeVisible();
    })

    test('manually adding an item to the inventory shows it on the page and clears inputs', async ({ page }) => {
      await page.getByRole('button', { name: 'Add Item'}).click();
      await page.getByLabel('Name').fill('Sample Item X');
      await page.getByLabel('Barcode').fill('123456789012');
      await page.getByLabel('Description').fill('This item represents a sample item');
      await page.getByLabel('Calories').fill('100');
      await page.getByLabel('Added Sugars').fill('10');
      await page.getByRole('button', {name: 'Save'}).click();

      await expect(page.getByText('Sample Item X')).toBeVisible();
      await expect(page.getByLabel('Name')).toBeEmpty();
    })

    // test.skip('scanning item adds it to inventory', async ({ page }) => {

    // })

    // test.skip('add item in inventory to daily total', async ({ page }) => {
    //   await page.getByRole('button', {name: '🖉'}).filter()
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
