import 'fake-indexeddb/auto';
import { describe, it, expect, beforeAll } from 'vitest';
import { inventory } from '$stores/stores.svelte';

describe('inventory', () => {
	it('can add an item to the store', async () => {
		await inventory.add(testItem);

		expect(inventory.get()).toEqual(
			expect.arrayContaining([expect.objectContaining({ name: 'test item' })])
		);
	});

	it('can remove an item from the store', async () => {
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
