import 'fake-indexeddb/auto';
import { describe, it, expect, beforeAll } from 'vitest';
import { inventory } from '$stores/stores.svelte';

describe('inventory', () => {
	it('can add an item', async () => {
		await inventory.add(testItem);

		expect(inventory.get()).toEqual(
			expect.arrayContaining([expect.objectContaining({ name: 'test item' })])
		);
	});

	// TODO
	// should remove an item from any existing recipes as well
	it('can remove an item', async () => {
		await inventory.add(testItem);
		await inventory.add(testItem2);
		expect(inventory.get()).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ name: 'test item' }),
				expect.objectContaining({ name: 'test item 2' })
			])
		);

		await inventory.remove('1234');
		expect(inventory.get()).toEqual(
			expect.not.arrayContaining([expect.objectContaining({ name: 'test item 2' })])
		);
	});

	it('can update an item', async () => {
		await inventory.add(testItem3);
		await inventory.update('3333', {
			id: '3333',
			name: 'updated!',
			description: 'desc goes here 3',
			barcode: '333333333',
			nutrients: [
				{
					key: 'calories',
					name: 'Calories',
					unit: 'kcal',
					quantity: 300
				},
				{
					key: 'calcium',
					name: 'Calcium',
					unit: 'mg',
					quantity: 333
				}
			]
		});

		expect(inventory.get()).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ name: 'test item' }),
				expect.objectContaining({
					name: 'updated!',
					nutrients: expect.arrayContaining([expect.objectContaining({ key: 'calcium' })])
				})
			])
		);
	});
});

describe('recipes', () => {
	it.skip('can add a recipe', async () => {});

	it.skip('can update a recipe', async () => {});

	it.skip('can remove a recipe', () => {});
});

const testItem: InventoryItem = {
	name: 'test item',
	description: 'desc goes here',
	barcode: '123456789',
	nutrients: [
		{
			key: 'calories',
			name: 'Calories',
			unit: 'kcal',
			quantity: 100
		}
	]
};
const testItem2: InventoryItem = {
	id: '1234',
	name: 'test item 2',
	description: 'desc goes here 2',
	barcode: '999999999',
	nutrients: [
		{
			key: 'calories',
			name: 'Calories',
			unit: 'kcal',
			quantity: 200
		}
	]
};
const testItem3: InventoryItem = {
	id: '3333',
	name: 'test item 3',
	description: 'desc goes here 3',
	barcode: '333333333',
	nutrients: [
		{
			key: 'calories',
			name: 'Calories',
			unit: 'kcal',
			quantity: 300
		}
	]
};
