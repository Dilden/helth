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
      await expect(page.getByLabel('Calories')).not.toBeVisible();
    });

    test('clicking Add Item shows form inputs', async ({ page }) => {
      await page.getByRole('button', { name: 'Add Item'}).click();
      await expect(page.getByLabel('Name')).toBeVisible();
      await expect(page.getByLabel('Added Sugars')).toBeVisible();
      await expect(page.getByLabel('Iron')).toBeVisible();
    })

    // run the next few tests in sequence
    test.describe('item management', () => {
      test.describe.configure({ mode: 'serial'});
      
      let page;
      test.beforeAll(async ({browser}) => {
        page = await browser.newPage();
        await page.goto('/');
        // close PWA Toast notification from Reload.svelte
        await page.getByRole('alert').getByRole('button', {name: 'Close'}).click();
        await page.getByRole('status').getByRole('button', {name: 'Yes'}).click();
        await page.getByRole('button', { name: '➕' }).click();
      })

      test('manually adding an item to the inventory shows it on the page and clears inputs', async () => {
        await page.getByRole('button', { name: 'Add Item'}).click(); 
        await page.getByLabel('Name').fill('Sample Item X');
        await page.getByLabel('Barcode').fill('123456789012');
        await page.getByLabel('Description').fill('This item represents a sample item');
        await page.getByLabel('Calories').fill('100');
        await page.getByLabel('Sodium').fill('20');
        await page.getByLabel('Protein').fill('20');
        await page.getByRole('button', {name: 'Save'}).click();

        await expect(page.getByText('Sample Item X')).toBeVisible();
        await expect(page.getByText('Sodium: 20mg')).toBeVisible();
        await expect(page.getByLabel('Name')).toBeEmpty();
      });

      test('add item in inventory to daily total', async () => {
        await page.getByRole('button', {name: '➕'}).click();
        await page.getByRole('button', {name: '➕'}).click();
        await page.getByRole('button', {name: '❌'}).click();

        await expect(page.locator('#countValue').nth(1)).toHaveValue('200');
        await expect(page.locator('#countValue').nth(2)).toHaveValue('40');
        
      })
      test('edit item in inventory', async () => {
        await page.getByRole('button', {name: '➕'}).click();
        await page.getByRole('listitem')
        .filter({hasText: 'Sample Item X'})
        .getByRole('button', {name: '✏️'})
        .click();

        await page.getByLabel('inventory-list').locator('#name').fill('New Sample Item');
        await page.getByRole('textbox', { name: 'kcal' }).fill('200');
        await page.getByRole('button', { name: 'Update' }).click();

        await expect(page.getByText('New Sample Item')).toBeVisible();
        await expect(page.getByText('Calories: 200kcal')).toBeVisible();
      })
      test('delete item in inventory', async () => {
        await page.getByRole('button', {name: '➕'}).click();
        await page.getByRole('listitem')
        .filter({hasText: 'New Sample Item'})
        .getByRole('button', {name: '🗑️'})
        .click();

        await page.getByRole('button', {name: 'Yes'}).click();

        await expect(page.getByText('New Sample Item')).not.toBeVisible();
      })
    });
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
