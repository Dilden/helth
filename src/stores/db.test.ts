import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import {
	dbopen,
	getListItems,
	addToList,
	getItemByIdFromTable,
	updateItemInList,
	deleteItemFromRecipes,
	findByName,
	getLatestDay,
	getDay,
	updateDay
} from '$stores/db';

beforeAll(async () => await dbopen);
afterAll(() => {
	indexedDB = new IDBFactory();
});

describe.sequential('list tables', () => {
	it('cannot add an item with the same ID', async () => {
		await addToList('recipes', { id: '1', name: 'test', description: 'desc', created: '1' });
		await expect(
			async () =>
				await addToList('recipes', { id: '1', name: 'should fail', description: 'plz fail' })
		).rejects.toThrowError();
	});

	it('can update an item in the list', async () => {
		await addToList('recipes', { id: '2', name: 'number 2', description: 'another thing' });
		const sample: InventoryItem = {
			name: 'numero dos',
			description: 'another thing',
			nutrients: [],
			barcode: null
		};
		await updateItemInList('recipes', '2', sample);
		expect(await getListItems('recipes')).toContainEqual(
			expect.objectContaining({ name: 'numero dos', description: 'another thing' })
		);
	});

	it('can get an item from a table by id', async () => {
		const one = await getItemByIdFromTable('recipes', '1');
		expect(one).toEqual(
			expect.objectContaining({
				id: '1',
				name: 'test',
				description: 'desc',
				created: '1'
			})
		);
	});
});

it('removes an item from recipes it exists in', async () => {
	const item1 = {
		id: '10',
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
		id: '11',
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
		id: '30',
		name: 'pizza',
		description: 'friday nights',
		items: [{ id: '10' }, { id: '11' }],
		created: '0'
	};
	await addToList('inventory', item1);
	await addToList('inventory', item2);
	await addToList('recipes', recipe);

	expect(await getItemByIdFromTable('recipes', '30')).toEqual(expect.objectContaining(recipe));

	await deleteItemFromRecipes('11');
	expect(await getItemByIdFromTable('recipes', '30')).toEqual(
		expect.objectContaining({
			id: '30',
			name: 'pizza',
			description: 'friday nights',
			items: [{ id: '10' }],
			created: '0'
		})
	);
});

describe('settings, goals, limits logic', () => {
	it('returns an item when given a name + table name', async () => {
		expect(await findByName('water', 'settings')).toBeTruthy();
	});
});

describe.sequential('journal', () => {
	it('can get a day', async () => {
		expect(await getLatestDay()).toBeTruthy();
	});
	it('can get a day by date', async () => {
		const x = await getLatestDay();
		expect(getDay(x?.date)).toBeTruthy();
	});
	it('can update a day', async () => {
		const x = await getLatestDay();
		expect(await updateDay(x?.date as number, { ...x, calories: 500 })).toEqual(1);
		expect(await getLatestDay()).toHaveProperty('calories', 500);
	});
	it('returns a 0 if there is no date to update', async () => {
		expect(await updateDay(12, { calories: 500 })).toEqual(0);
	});
});
