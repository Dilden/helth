import 'fake-indexeddb/auto';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { inventory, recipes, q, searchResults } from '$stores/stores.svelte';
import { defaultInventory, defaultRecipes } from '../vitest/defaultInventory';

// vi.mock('$utils/recipe', () => {
// 	return {
// 		lookupItems: (recipe: Recipe) => {
// 			return recipe.items.map((i) => defaultInventory.find((x) => Number(x.id) === i.id));
// 		}
// 	};
// });

beforeAll(async () => {
	for (const item of defaultInventory) {
		await inventory.add(item);
	}
	for (const recipe of defaultRecipes) {
		await recipes.add(recipe);
	}
});

describe('unified search', () => {
	it('not setting query shows all', async () => {
		const res = await searchResults();
		expect(res.results).toHaveLength(6);
		expect(res.results).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ name: 'Coca-Cola' }),
				expect.objectContaining({ name: 'Water' }),
				expect.objectContaining({ name: 'Syrup' }),
				expect.objectContaining({ name: 'toxic waste' }),
				expect.objectContaining({ name: 'beezchurger' }),
				expect.objectContaining({ name: 'gnarly mess' })
			])
		);
	});
	it('blank query shows all options', async () => {
		q.query = '';
		const res = await searchResults();
		expect(res.results).toHaveLength(6);
		expect(res.results).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ name: 'Coca-Cola' }),
				expect.objectContaining({ name: 'Water' }),
				expect.objectContaining({ name: 'Syrup' }),
				expect.objectContaining({ name: 'toxic waste' }),
				expect.objectContaining({ name: 'beezchurger' }),
				expect.objectContaining({ name: 'gnarly mess' })
			])
		);
	});

	it('only shows the searched item', async () => {
		q.query = 'Water';
		const res = await searchResults();
		expect(res.results).toHaveLength(1);
		expect(res.results).toEqual(
			expect.arrayContaining([
				expect.not.objectContaining({ name: 'Coca-Cola' }),
				expect.objectContaining({ name: 'Water' }),
				expect.not.objectContaining({ name: 'Syrup' }),
				expect.not.objectContaining({ name: 'toxic waste' }),
				expect.not.objectContaining({ name: 'beezchurger' }),
				expect.not.objectContaining({ name: 'gnarly mess' })
			])
		);
	});
	it('only shows the searched recipe', async () => {
		q.query = 'beezchurger';
		const res = await searchResults();
		expect(res.results).toHaveLength(1);
		expect(res.results).toEqual(
			expect.arrayContaining([
				expect.not.objectContaining({ name: 'Coca-Cola' }),
				expect.not.objectContaining({ name: 'Water' }),
				expect.not.objectContaining({ name: 'Syrup' }),
				expect.not.objectContaining({ name: 'toxic waste' }),
				expect.objectContaining({ name: 'beezchurger' }),
				expect.not.objectContaining({ name: 'gnarly mess' })
			])
		);
	});
});
