import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';
import { describe, it, expect, beforeAll } from 'vitest';
import { recipes } from '$stores/stores.js';
import { getListItems } from '$stores/db';

beforeAll(async () => {
	indexedDB = new IDBFactory();
	await recipes.init();
});

describe.sequential('recipes store r/w to DB', () => {
	it('can set a value', async () => {
		await recipes.set({
			name: 'first recipe',
			description: 'its just a test, bro'
		});

		const unsub = recipes.subscribe((value) => {
			expect(value).toContainEqual(
				expect.objectContaining({
					name: 'first recipe',
					description: 'its just a test, bro'
				})
			);
		});
		unsub();
	});

	it('can update a value', async () => {
		const recipesList = await getListItems('recipes');

		await recipes.set({
			id: recipesList[0].id,
			name: 'updated',
			description: recipesList[0].description
		});

		const unsub = recipes.subscribe((value) => {
			expect(value).toContainEqual(
				expect.objectContaining({
					name: 'updated',
					description: 'its just a test, bro'
				})
			);
		});
		unsub();
	});

	it('can delete an item', async () => {
		const recipesList = await getListItems('recipes');
		await recipes.delete(recipesList[0].id);

		const unsub = recipes.subscribe((value) => {
			expect(value).toStrictEqual([]);
		});
		unsub();
	});
});
