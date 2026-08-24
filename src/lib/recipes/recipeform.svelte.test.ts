import { render, screen, within } from '@testing-library/svelte';
import { it, expect, vi, describe, beforeAll } from 'vitest';
import RecipeForm from './RecipeForm.svelte';
import userEvent from '@testing-library/user-event';
import { defaultRecipes } from '../../vitest/defaultInventory';
import { inventorySearchResults, inventorySearch } from '$stores/stores.svelte';

it.skip('has text inputs for name and description', async () => {
	render(RecipeForm);
	expect(screen.getByLabelText('Recipe Name')).toBeVisible();
	expect(screen.getByLabelText('Recipe Description')).toBeVisible();
});

it.skip('shows inventory items in checkboxes', async () => {
	inventorySearch.query = '';
	render(RecipeForm);

	expect(screen.getByRole('checkbox', { name: 'Coca-Cola' })).toBeVisible();
	expect(screen.getByRole('checkbox', { name: 'Water' })).toBeVisible();
});

it.skip('inventorySearch text hides elements from inventory', () => {
	inventorySearch.query = 'coc';

	render(RecipeForm);

	// parent element is actually hidden
	expect(screen.getByLabelText('Coca-Cola')).toBeVisible();
	expect(screen.getByLabelText('Water').parentElement?.parentElement).toHaveClass('hidden');
});

it.skip('prefills the fields with data from provided item', () => {
	render(RecipeForm, { recipe: defaultRecipes[0] });

	expect(screen.getByLabelText('Recipe Name')).toHaveValue('toxic waste');
	expect(screen.getByLabelText('Recipe Description')).toHaveValue('heaping garbage dumpster fire');
	expect(screen.getByLabelText('Coca-Cola')).toBeChecked();
	expect(screen.getByLabelText('Water')).toBeChecked();
	expect(screen.getByLabelText('Syrup')).not.toBeChecked();
});

it.skip('shows a search box to filter inventory items', () => {
	render(RecipeForm);
	expect(screen.getByLabelText('Filter inventory')).toBeVisible();
});

it.skip('calls a cancel callback fn', async () => {
	const cancel = vi.fn();
	const user = userEvent.setup();

	render(RecipeForm, { recipe: defaultRecipes[0], cancelCallback: cancel });

	await user.click(screen.queryByRole('button', { name: 'Cancel' }) as Element);
	expect(cancel).toHaveBeenCalledOnce();
});

describe('servings', () => {
	beforeAll(() => {
		inventorySearch.query = '';
	});

	it.skip('has serving quantity inputs next to checkboxes', () => {
		render(RecipeForm, { recipe: defaultRecipes[0] });

		const boxAncestor: HTMLElement = screen
			.getByRole('checkbox', { name: 'Coca-Cola' })
			.closest('div')!; // ! magically tells TS that this won't be null
		expect(within(boxAncestor).getByLabelText('Coca-Cola')).toBeChecked();
		expect(within(boxAncestor).getByLabelText('Servings')).toHaveValue(1);

		const box2Ancestor: HTMLElement = screen
			.getByRole('checkbox', { name: 'Water' })
			.closest('div')!; // ! magically tells TS that this won't be null
		expect(within(box2Ancestor).getByLabelText('Water')).toBeChecked();
		expect(within(box2Ancestor).getByLabelText('Servings')).toHaveValue(2);
	});

	it.skip('hides servings inputs for unchecked boxes', () => {
		render(RecipeForm, { recipe: defaultRecipes[0] });

		const boxAncestor: HTMLElement = screen
			.getByRole('checkbox', { name: 'Syrup' })
			.closest('div')!; // ! magically tells TS that this won't be null
		expect(within(boxAncestor).getByLabelText('Syrup')).not.toBeChecked();
		expect(within(boxAncestor).queryByLabelText('Servings')).toBeNull();
	});

	it('shows servings input when checkbox is clicked', async () => {
		const user = userEvent.setup();
		render(RecipeForm, { recipe: defaultRecipes[0] });

		const box = screen.getByRole('checkbox', { name: 'Syrup' });
		await user.click(box);
		// if (container != null) {
		expect(within(box.closest('div')!).getByRole('spinbutton', { name: 'Servings' })).toBeVisible();
		// expect(within(container).queryByLabelText('Servings')).toBeVisible();
		// }
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
			add: vi.fn((r) => Promise.resolve([]))
		},
		inventory: {
			init: vi.fn(() => Promise.resolve())
		},
		inventorySearch: s,
		inventorySearchResults: vi.fn(() => {
			return {
				results: defaultInventory
			};
		})
	};
});
