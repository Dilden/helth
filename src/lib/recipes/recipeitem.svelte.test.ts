import 'fake-indexeddb/auto';
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import userEvent from '@testing-library/user-event';
import RecipeItem from './RecipeItem.svelte';
import { defaultRecipes, defaultInventory } from '../../vitest/defaultInventory';

const testRecipe: any = defaultRecipes[0]; // lol idgaf
testRecipe.items[0] = { ...defaultRecipes[0].items[0], ...defaultInventory[0] };
testRecipe.items[1] = { ...defaultRecipes[0].items[1], ...defaultInventory[1] };
// beforeAll(() => {
// 	testRecipe.items = [];
// 	defaultRecipes[0].items.forEach((r) => {
// 		testRecipe.items.push({ ...defaultInventory.find((i) => i.id === r.id) });
// 	});
// });

describe('recipe items', () => {
	it('shows a recipe title & description', () => {
		render(RecipeItem, {
			recipe: testRecipe
		});
		expect(screen.getByText('Recipe')).toBeVisible();
		expect(screen.getByRole('heading', { name: 'toxic waste' })).toBeVisible();
		expect(screen.getByText('heaping garbage dumpster fire')).toBeVisible();
		expect(screen.getByRole('spinbutton', { name: 'Servings' })).toHaveValue(1);
	});
	it('shows inventory items in recipe with quantities summed', () => {
		render(RecipeItem, {
			recipe: testRecipe
		});
		expect(screen.getByText('Coca-Cola')).toBeVisible();
		expect(screen.getByText('Water')).toBeVisible();
		expect(screen.getByText('Calories: 200kcal')).toBeVisible();
		expect(screen.getByText('Added Sugars: 300g')).toBeVisible();
	});

	it('shows a form to edit recipes', async () => {
		const user = userEvent.setup();
		render(RecipeItem, {
			recipe: testRecipe
		});

		await user.click(screen.queryByRole('button', { name: '✏️' }) as Element);

		expect(screen.getByLabelText('Recipe Name')).toHaveValue('toxic waste');
		expect(screen.getByLabelText('Recipe Description')).toHaveValue(
			'heaping garbage dumpster fire'
		);
		expect(screen.getByLabelText('Coca-Cola')).toBeChecked();
		expect(screen.getByLabelText('Water')).toBeChecked();
		expect(screen.getByLabelText('Syrup')).not.toBeChecked();
	});

	it('can close the edit form', async () => {
		const user = userEvent.setup();
		render(RecipeItem, {
			recipe: testRecipe
		});

		await user.click(screen.queryByRole('button', { name: '✏️' }) as Element);

		expect(screen.getByLabelText('Recipe Name')).toHaveValue('toxic waste');

		await user.click(screen.queryByRole('button', { name: 'Cancel' }) as Element);

		expect(screen.queryByLabelText('Recipe Name')).toBeNull();
		expect(screen.queryByRole('button', { name: 'Cancel' })).toBeNull();
		expect(screen.getByText('toxic waste')).toBeVisible();
		expect(screen.getByText('heaping garbage dumpster fire')).toBeVisible();
	});
});

vi.mock('$stores/stores.svelte', async () => {
	let s = $state({ query: '' });

	const { defaultInventory } = await import('../../vitest/defaultInventory');

	return {
		recipes: {
			init: vi.fn(() => Promise.resolve()),
			// get: vi.fn(() => Promise.resolve([...defaultRecipes])),
			update: vi.fn((id, r) => Promise.resolve()), // not actually adding anything yet
			add: vi.fn((r) => Promise.resolve([])),
			remove: vi.fn((id) => Promise.resolve())
		},
		inventory: {
			init: vi.fn(() => Promise.resolve())
		},
		inventorySearch: s,
		inventorySearchResults: vi.fn(() => {
			return {
				results: defaultInventory
			};
		}),
		today: {
			get: vi.fn(() => { }),
			update: vi.fn(() => { })
		}
	};
});
