import { describe, it, expect } from 'vitest';
import { migrateInventoryIds, migrateRecipeItemIds } from './dbupgrade';

describe('can migrate DB data', () => {
	{
		it('migrates the inventory IDs', () => {
			expect(migrateInventoryIds(inventoryRows)).toEqual([101, 102, 104, 105, 106, 107]);
		});

		it('migrates the foreign keys in recipe.items', () => {
			expect(migrateRecipeItemIds(recipeRows, inventoryRows[0].id, 101)).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						items: [{ id: 101 }, { id: 2 }]
					})
				])
			);

			expect(migrateRecipeItemIds(recipeRows, inventoryRows[1].id, 102)).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						items: [{ id: 101 }, { id: 102 }]
					})
				])
			);

			expect(migrateRecipeItemIds(recipeRows, inventoryRows[2].id, 104)).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						items: [{ id: 104 }]
					})
				])
			);
			expect(migrateRecipeItemIds(recipeRows, inventoryRows[3].id, 105)).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						items: [{ id: 105 }, { id: 6 }, { id: 7 }]
					})
				])
			);
			expect(migrateRecipeItemIds(recipeRows, inventoryRows[4].id, 106)).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						items: [{ id: 105 }, { id: 106 }, { id: 7 }]
					})
				])
			);

			expect(migrateRecipeItemIds(recipeRows, inventoryRows[5].id, 107)).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						items: [{ id: 105 }, { id: 106 }, { id: 107 }]
					})
				])
			);
		});
	}
});

const recipeRows: Recipe[] = [
	{
		id: 1,
		name: 'burgers',
		description: 'derp',
		items: [
			{
				id: 1,
				servings: 1
			},
			{
				id: 2,
				servings: 1
			}
		]
	},
	{
		id: 3,
		name: 'chomp',
		description: 'dumb',
		items: [
			{
				id: 4,
				servings: 1
			}
		]
	},
	{
		id: 4,
		name: 'nope',
		description: 'nope',
		items: [
			{
				id: 5,
				servings: 1
			},
			{
				id: 6,
				servings: 1
			},
			{
				id: 7,
				servings: 1
			}
		]
	}
];
const inventoryRows: InventoryItem[] = [
	{
		id: 1,
		name: 'fiirst',
		description: 'desc goes here',
		barcode: 'none',
		nutrients: [
			{
				key: 'calories',
				name: 'Calories',
				quantity: 1,
				unit: 'g'
			}
		]
	},
	{
		id: 2,
		name: 'second',
		description: 'desc goes here',
		barcode: 'none',
		nutrients: [
			{
				key: 'calories',
				name: 'Calories',
				quantity: 1,
				unit: 'g'
			}
		]
	},
	{
		id: 4,
		name: 'fourth',
		description: 'desc goes here',
		barcode: 'none',
		nutrients: [
			{
				key: 'calories',
				name: 'Calories',
				quantity: 1,
				unit: 'g'
			}
		]
	},
	{
		id: 5,
		name: 'fifth',
		description: 'desc goes here',
		barcode: 'none',
		nutrients: [
			{
				key: 'calories',
				name: 'Calories',
				quantity: 1,
				unit: 'g'
			}
		]
	},
	{
		id: 6,
		name: 'sixth',
		description: 'desc goes here',
		barcode: 'none',
		nutrients: [
			{
				key: 'calories',
				name: 'Calories',
				quantity: 1,
				unit: 'g'
			}
		]
	},
	{
		id: 7,
		name: 'seventh',
		description: 'desc goes here',
		barcode: 'none',
		nutrients: [
			{
				key: 'calories',
				name: 'Calories',
				quantity: 1,
				unit: 'g'
			}
		]
	}
];
