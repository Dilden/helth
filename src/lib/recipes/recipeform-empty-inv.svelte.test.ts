import { render, screen, within } from '@testing-library/svelte';
import { it, expect, vi } from 'vitest';
import RecipeForm from './RecipeForm.svelte';
import { recipesInventoryFilter } from '$stores/stores.svelte';

it('alerts user there are no items in inventory', async () => {
	recipesInventoryFilter.query = 'ladkfjalkcea';
	render(RecipeForm);
	expect(
		screen.getByText(
			'No items found in inventory! Go scan something or Add an Item to your Inventory manually before creating a recipe.'
		)
	).toBeVisible();
});

vi.mock('$stores/stores.svelte', async () => {
	let s = $state({ query: 'a' });

	return {
		recipes: {
			init: vi.fn(() => Promise.resolve()),
			// get: vi.fn(() => Promise.resolve([...defaultRecipes])),
			update: vi.fn((id, r) => Promise.resolve()), // not actually adding anything yet
			add: vi.fn((r) => Promise.resolve([]))
		},
		inventorySearch: s,
		recipesInventoryFilter: s,
		inventorySearchResults: vi.fn(() => {
			return {
				results: []
			};
		})
	};
});
