import { expect, test } from '@playwright/test';

test.describe('add items dialog', () => {
	test.describe('inventory', () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/');
			await page.getByRole('button', { name: 'Open Add Dialog' }).click();
		});

		test('inventory is shown by default', async ({ page }) => {
			await expect(page.getByText('Saved Items')).toBeVisible();
		});

		test('add items to inventory form is hidden by default', async ({ page }) => {
			await expect(page.getByLabel('Name', { exact: true })).not.toBeVisible();
			await expect(page.getByLabel('Calories', { exact: true })).not.toBeVisible();
		});

		test('clicking Add Item shows form inputs', async ({ page }) => {
			await page.getByRole('button', { name: 'Add Item' }).click();
			await expect(page.getByLabel('Name')).toBeVisible();
			await expect(page.getByLabel(' Added Sugars', { exact: true })).toBeVisible();
			await expect(page.getByLabel('Iron', { exact: true })).toBeVisible();
		});

		// run the next few tests in sequence
		test.describe('item management', () => {
			test.describe.configure({ mode: 'serial' });

			let page;
			test.beforeAll(async ({ browser }) => {
				page = await browser.newPage();
				await page.goto('/');
				await page.getByRole('status').getByRole('button', { name: 'Yes' }).click();
				await page
					.getByRole('alert')
					.filter({ hasText: 'App ready to work offline' })
					.getByRole('button', { name: 'Close' })
					.click();
				await page.getByRole('button', { name: 'Open Add Dialog' }).click();
			});

			test('manually adding an item to the inventory shows it on the page and clears inputs', async () => {
				await page.getByRole('button', { name: 'Add Item' }).click();
				await page.getByLabel('Name').fill('Sample Item X');
				await page.getByLabel('Barcode').fill('123456789012');
				await page.getByLabel('Description').fill('This item represents a sample item');
				await page.getByLabel('Calories', { exact: true }).fill('100');
				await page.getByLabel('Sodium', { exact: true }).fill('20');
				await page.getByLabel('Protein', { exact: true }).fill('20');
				await page.getByRole('button', { name: 'Save' }).click();

				await expect(page.getByText('Sample Item X')).toBeVisible();
				await expect(page.getByText('Sodium: 20mg')).toBeVisible();
				await expect(page.getByText('Servings')).toHaveValue('1');
			});

			test('add item in inventory to daily total', async () => {
				await page.getByText('Servings').fill('2');
				await page
					.getByTitle('Add Item nutients (times specified servings) to Daily Total')
					.click();
				await page.getByRole('button', { name: 'Close Add Dialog' }).click();

				await expect(
					page.getByText('Added 2 servings of Sample Item X to daily total!')
				).toBeVisible();
				await expect(page.getByLabel('⚡ Calories (kcal)', { exact: true })).toHaveValue('200');
				await expect(page.getByLabel('🧂 Sodium (mg)', { exact: true })).toHaveValue('40');
			});

			test('edit item in inventory', async () => {
				await page.getByRole('button', { name: 'Open Add Dialog' }).click();
				await page
					.getByRole('listitem')
					.filter({ hasText: 'Sample Item X' })
					.getByRole('button', { name: '✏️' })
					.click();

				await page.getByLabel('inventory-list').locator('#name').fill('New Sample Item');
				await page.getByPlaceholder('kcal').fill('200');
				await page.getByRole('button', { name: 'Update' }).click();

				await expect(page.getByText('New Sample Item')).toBeVisible();
				await expect(page.getByText('Calories: 200kcal')).toBeVisible();
			});

			test('search item name shows it in inventory', async () => {
				await page.getByPlaceholder('Begin typing...').fill('New Sampl');

				await expect(page.getByText('New Sample Item')).toBeVisible();
			});
			test('search other query hides item in inventory', async () => {
				await page.getByPlaceholder('Begin typing...').fill('zzzzzz');

				await expect(page.getByText('New Sample Item')).not.toBeVisible();
			});

			test('delete item in inventory', async () => {
				await page.getByPlaceholder('Begin typing...').fill('');
				await page.getByRole('button', { name: '➕' }).click();
				await page
					.getByRole('listitem')
					.filter({ hasText: 'New Sample Item' })
					.getByRole('button', { name: '🗑️' })
					.click();

				await page.getByRole('button', { name: 'Yes' }).click();

				await expect(page.getByText('New Sample Item')).not.toBeVisible();
			});
		});
	});

	test.describe('recipes', () => {
		test.describe.configure({ mode: 'serial' });
		let page;

		test.beforeAll(async ({ browser }) => {
			page = await browser.newPage();
			await page.route('**', (route) => route.continue());
			await page.goto('/');
			await page
				.locator('li')
				.filter({ hasText: "Don't lose your data! Make storage persistent now? Yes No" })
				.getByTitle('Yes')
				.click();
			await page
				.getByRole('alert')
				.filter({ hasText: 'App ready to work offline' })
				.getByRole('button', { name: 'Close' })
				.click();
			await page.getByRole('button', { name: 'Open Add Dialog' }).click();

			await page.getByRole('button', { name: 'Add Item' }).click();
			await page.getByLabel('Name').fill('Coca-Cola');
			await page.getByLabel('Barcode').fill('111111111111');
			await page.getByLabel('Description').fill('sweet nectar of the gods');
			await page.getByLabel('Calories', { exact: true }).fill('250');
			await page.getByLabel('Sodium', { exact: true }).fill('20');
			await page.getByLabel('Protein', { exact: true }).fill('0');
			await page.getByRole('button', { name: 'Save' }).click();

			await page.getByRole('button', { name: 'Add Item' }).click();
			await page.getByLabel('Name').fill('Pepsi');
			await page.getByLabel('Barcode').fill('222222222222');
			await page.getByLabel('Description').fill('will strip your insides clean');
			await page.getByLabel('Calories', { exact: true }).fill('250');
			await page.getByLabel('Sodium', { exact: true }).fill('20');
			await page.getByLabel('Protein', { exact: true }).fill('0');
			await page.getByRole('button', { name: 'Save' }).click();
		});

		test('saves a recipe to the DB', async () => {
			await page.getByRole('button', { name: 'Recipes' }).click();
			await page.getByRole('button', { name: 'Add Recipe' }).click();
			await page.getByLabel('Recipe Name').fill('Soda');
			await page.getByLabel('Description').fill('horrid concoction');
			await page.getByLabel('Coca-Cola').check();
			await page.getByLabel('Pepsi').check();
			await page.getByRole('button', { name: 'Save' }).click();

			// await expect(page.getByLabel('Name')).toBeEmpty();
			await expect(page.getByText('Soda')).toBeVisible();
			await expect(page.getByText('horrid concoction')).toBeVisible();
			await expect(page.getByText('Coca-Cola').first()).toBeVisible();
			// // it works but is showing triple the quantities it should be showing
			// // maybe has something to do with the browsers?
			await expect(page.getByText('Calories: 500kcal')).toBeVisible();
			await expect(page.getByText('Sodium: 40mg')).toBeVisible();
			await expect(page.getByText('Protein: 0mg')).not.toBeVisible();
		});

		test('can filter inventory items in recipe form', async () => {
			await page.getByRole('button', { name: 'Add Recipe' }).click();
			await page.getByLabel('Filter inventory').fill('Pepsi');

			await expect(page.getByLabel('Pepsi')).toBeVisible();
			await expect(page.getByLabel('Coca-Cola')).not.toBeVisible();

			await page.getByLabel('Filter inventory').fill('');
			await page.getByRole('button', { name: 'Save' }).click();
		});

		test('adds a recipe to the current daily total', async () => {
			// await page.locator('li').filter({ hasText: 'Soda' }).getByTitle('Add to Daily Total').click();
			await page.getByText('Servings').fill('2');
			await page
				.locator('li')
				.filter({ hasText: 'Soda' })
				.getByTitle('Add Recipe nutients (multiplied by specified servings) to Daily Total')
				.click();
			await page.getByRole('button', { name: 'Close Add Dialog' }).click();

			await expect(page.getByText('Added 2 servings of Soda to daily total!')).toBeVisible();
			await expect(page.getByLabel('⚡ Calories (kcal)', { exact: true })).toHaveValue('1000');
			await expect(page.getByLabel('🧂 Sodium (mg)', { exact: true })).toHaveValue('80');
		});

		test('edits a recipe', async () => {
			await page.getByRole('button', { name: 'Open Add Dialog' }).click();
			await page.getByRole('button', { name: 'Recipes' }).click();
			await page
				.getByRole('listitem')
				.filter({ hasText: 'Soda' })
				.getByRole('button', { name: '✏️' })
				.click();

			// doing this on the wrong form
			await page.locator('li').getByLabel('Recipe Name').fill('Soda 2');
			await page.locator('li').getByLabel('Description').fill('better w/o that garbage');
			await page.locator('li').getByLabel('Pepsi').uncheck();
			await page.getByRole('button', { name: 'Update' }).click();

			await expect(page.locator('li').getByText('Soda 2')).toBeVisible();
			await expect(page.locator('li').getByText('better w/o that garbage')).toBeVisible();
			await expect(page.locator('li').getByText('Pepsi')).not.toBeVisible();
		});

		test('can delete a recipe', async () => {
			await page
				.getByRole('listitem')
				.filter({ hasText: 'Soda' })
				.getByRole('button', { name: '🗑️' })
				.click();

			await page
				.locator('li')
				.filter({ hasText: 'Are you sure you want to delete this item? Yes No' })
				.getByTitle('Yes')
				.click();

			await expect(page.getByText('Soda', { exact: true })).not.toBeVisible();
		});
	});
	// test.describe('scanner', () => {
	//   test.skip('scanning a barcode adds it to the inventory', async ({ page }) => {
	//     openDialog(page);
	//     // await page.getByRole('button', {name: '🖉'}).filter()
	//   })
	// })
});
