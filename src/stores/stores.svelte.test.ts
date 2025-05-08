import 'fake-indexeddb/auto';
import { describe, it, expect, beforeAll } from 'vitest';
import { inventory, recipes, goals, settings, today } from '$stores/stores.svelte';
import { defaultTodayStoreValues } from '../vitest/defaultTodayStore';

describe.sequential('inventory', () => {
	it('can add an item', async () => {
		await inventory.add(testItem);

		expect(inventory.get()).toEqual(
			expect.arrayContaining([expect.objectContaining({ name: 'test item' })])
		);
	});

	it('can remove an item', async () => {
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

describe.sequential('recipes', () => {
	it('can add a recipe', async () => {
		await recipes.add(recipe1);

		expect(recipes.get()).toEqual(
			expect.arrayContaining([expect.objectContaining({ name: 'first recipe' })])
		);
	});

	it('can update a recipe', async () => {
		await recipes.add(recipe2);
		await recipes.update('22222', {
			name: 'second',
			description: 'something else now',
			items: [
				{ id: '1234', servings: 1 },
				{ id: '3333', servings: 3 }
			]
		});

		expect(recipes.get()).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ name: 'first recipe' }),
				expect.objectContaining({
					name: 'second',
					description: 'something else now',
					items: expect.arrayContaining([
						expect.objectContaining({ id: '1234' }),
						expect.objectContaining({ id: '3333' })
					])
				})
			])
		);
	});

	it('can remove a recipe', async () => {
		await recipes.remove('22222');
		expect(recipes.get()).toEqual(
			expect.not.arrayContaining([expect.objectContaining({ id: '22222' })])
		);
	});
});

it('removes a linked item from a recipe when an item is deleted', async () => {
	await inventory.add({ ...testItem2, id: '666' });
	await inventory.add({ ...testItem3, id: '777' });
	await recipes.add({
		id: '55555',
		name: 'recipe with real items',
		description: 'only one item should remain...',
		items: [
			{
				id: '666',
				servings: 2
			},
			{ id: '777', servings: 1 }
		]
	});

	expect(recipes.get()).toEqual(
		expect.arrayContaining([
			expect.objectContaining({
				id: '55555',
				items: expect.arrayContaining([
					expect.objectContaining({ id: '666' }),
					expect.objectContaining({ id: '777' })
				])
			})
		])
	);

	await inventory.remove('666');

	// TODO: after removing an inventory item, the recipes store must be reinitialized!
	// consider refactoring the store to automatically do this
	await recipes.init();

	expect(recipes.get()).toEqual(
		expect.arrayContaining([
			expect.objectContaining({
				id: '55555',
				items: expect.not.arrayContaining([expect.objectContaining({ id: '666' })])
			})
		])
	);
});

describe.sequential('name value stores', () => {
	it('can add a goal', async () => {
		await goals.add(testGoal1);
		expect(goals.get()).toHaveProperty('ayylmfao', expect.objectContaining(testGoal1));
	});
	it('can update a goal', async () => {
		await goals.update('ayylmfao', { name: 'roflmao', value: 420 });
		expect(goals.get()).toHaveProperty(
			'roflmao',
			expect.objectContaining({ name: 'roflmao', value: 420 })
		);
		expect(goals.get()).not.toHaveProperty(
			'ayylmfao',
			expect.objectContaining({ name: 'ayylmfao', value: 69 })
		);
	});
	it('can delete a goal', async () => {
		await goals.remove('roflmao');
		expect(goals.get()).not.toHaveProperty('rolfmao', { name: 'roflmao', value: 420 });
	});
});

describe.sequential('setting store', () => {
	it('can add a setting', async () => {
		await settings.add(testSetting);
		expect(settings.get()).toHaveProperty('derp', expect.objectContaining(testSetting));
	});
});

describe.sequential('today store', () => {
	beforeAll(async () => {
		await today.setDate(defaultTodayStoreValues.date);
	});
	it('can init as a day', async () => {
		expect(today.get()).toHaveProperty('calories', 0);
	});
	it('can update a value', async () => {
		await today.update({ ...defaultTodayStoreValues, calories: 555 });
		expect(today.get()).toHaveProperty('calories', 555);
		expect(today.get()).not.toHaveProperty('calories', 0);
	});
});

const testSetting: Setting = {
	name: 'derp',
	value: {
		interval: 69,
		enabled: true,
		position: 0
	}
};

const testGoal1: Goal = {
	name: 'ayylmfao',
	value: 69
};
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

const recipe1 = {
	name: 'first recipe',
	description: 'its just a test, bro',
	items: []
};

const recipe2 = {
	id: '22222',
	name: '2nd',
	description: 'SHOULD CHANGE ON UPDATE',
	items: []
};
