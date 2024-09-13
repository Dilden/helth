import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import {
	dbopen,
	getListItems,
	addToList,
	getItemByIdFromTable,
	updateItemInList,
	deleteItemFromRecipes
} from '$stores/db.js';

beforeAll(async () => await dbopen);
afterAll(() => {
	indexedDB = new IDBFactory();
});

describe.sequential('list tables', () => {
	it('adds an item to a list', async () => {
		await addToList('recipes', { id: 1, name: 'test', description: 'desc' });
	});

	it('cannot add an item with the same ID', async () => {
		expect(
			async () =>
				await addToList('recipes', { id: 1, name: 'should fail', description: 'plz fail' })
		).rejects.toThrowError();
	});

	it('can update an item in the list', async () => {
		await addToList('recipes', { id: 2, name: 'number 2', description: 'another thing' });
		await updateItemInList('recipes', 2, { name: 'numero dos' });
		expect(await getListItems('recipes')).toContainEqual(
			expect.objectContaining({ name: 'numero dos', description: 'another thing' })
		);
	});

	it('can get an item from a table by id', async () => {
		const one = await getItemByIdFromTable('recipes', 1);
		expect(one).toEqual({
			id: 1,
			name: 'test',
			description: 'desc'
		});
	});
});

it('removes an item from recipes it exists in', async () => {
	const item1 = {
		id: 10,
		name: 'pizza crust',
		description: 'the base of it all',
		nutrients: {
			calories: {
				name: 'Calories',
				quantity: '50',
				unit: 'kcal'
			}
		}
	};
	const item2 = {
		id: 11,
		name: 'sauce',
		description: 'flavor',
		nutrients: {
			calories: {
				name: 'Calories',
				quantity: '50',
				unit: 'kcal'
			}
		}
	};
	const recipe = {
		id: 30,
		name: 'pizza',
		description: 'friday nights',
		items: [{ id: 10 }, { id: 11 }]
	};
	await addToList('inventory', item1);
	await addToList('inventory', item2);
	await addToList('recipes', recipe);

	expect(await getItemByIdFromTable('recipes', 30)).toEqual(recipe);

	await deleteItemFromRecipes(11);
	expect(await getItemByIdFromTable('recipes', 30)).toEqual({
		id: 30,
		name: 'pizza',
		description: 'friday nights',
		items: [{ id: 10 }]
	});
});
