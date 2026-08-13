import 'fake-indexeddb/auto';
import { render, screen, within } from '@testing-library/svelte';
import { it, expect, vi, describe } from 'vitest';
import RecipeForm from './RecipeForm.svelte';
import userEvent from '@testing-library/user-event';

it('inventorySearch text hides elements from inventory', () => {
	render(RecipeForm, {
		inventoryItems: [
			{
				id: 10,
				name: 'demo',
				description: 'description goes here'
			},
			{
				id: 11,
				name: 'test',
				description: 'for testing'
			}
		]
	});

	// parent element is actually hidden
	expect(screen.getByLabelText('test')).toBeVisible();
	expect(screen.getByLabelText('demo').parentElement?.parentElement).toHaveClass('hidden');
});

it('has text inputs for name and description', async () => {
	render(RecipeForm, { inventoryItems: [] });
	expect(screen.getByLabelText('Recipe Name')).toBeVisible();

	expect(screen.getByLabelText('Recipe Description')).toBeVisible();
});

it('alerts user there are no items in inventory', async () => {
	render(RecipeForm, { inventoryItems: [] });
	expect(
		screen.getByText(
			'No items found in inventory! Go scan something or Add an Item to your Inventory manually before creating a recipe.'
		)
	).toBeVisible();
});

it('shows inventory items in checkboxes', async () => {
	render(RecipeForm, {
		inventoryItems: [
			{
				id: 1,
				name: 'First',
				description: 'description goes here'
			},
			{
				id: 2,
				name: 'Second',
				description: 'also goes here'
			}
		]
	});

	expect(screen.getByRole('checkbox', { name: 'First' })).toBeVisible();
	expect(screen.getByRole('checkbox', { name: 'Second' })).toBeVisible();
});

it('prefills the fields with data from provided item', () => {
	render(RecipeForm, recipeHasItem1);

	expect(screen.getByLabelText('Recipe Name')).toHaveValue('noodles');
	expect(screen.getByLabelText('Recipe Description')).toHaveValue('a lazy meal');
	expect(screen.getByLabelText('First')).toBeChecked();
	expect(screen.getByLabelText('Second')).not.toBeChecked();
});

it('shows a search box to filter inventory items', () => {
	render(RecipeForm, {
		inventoryItems: [
			{
				id: 10,
				name: 'demo',
				description: 'description goes here'
			}
		]
	});
	expect(screen.getByLabelText('Filter inventory')).toBeVisible();
});

it('calls a cancel callback fn', async () => {
	const cancel = vi.fn();
	const user = userEvent.setup();

	render(RecipeForm, { ...recipeHasItem1, cancelCallback: cancel });

	await user.click(screen.queryByRole('button', { name: 'Cancel' }) as Element);
	expect(cancel).toHaveBeenCalledOnce();
});

describe('servings', () => {
	it('has serving quantity inputs next to checkboxes', () => {
		render(RecipeForm, recipeHasItem1);

		const boxAncestor: HTMLElement = screen
			.getByRole('checkbox', { name: 'First' })
			.closest('div')!; // ! magically tells TS that this won't be null
		expect(within(boxAncestor).getByLabelText('First')).toBeChecked();
		expect(within(boxAncestor).getByLabelText('Servings')).toHaveValue(3);
	});

	it('hides servings inputs for unchecked boxes', () => {
		render(RecipeForm, recipeHasItem1);

		const boxAncestor: HTMLElement = screen
			.getByRole('checkbox', { name: 'Second' })
			.closest('div')!; // ! magically tells TS that this won't be null
		expect(within(boxAncestor).getByLabelText('Second')).not.toBeChecked();
		expect(within(boxAncestor).queryByLabelText('Servings')).toBeNull();
	});

	it('shows servings input when checkbox is clicked', async () => {
		const user = userEvent.setup();
		render(RecipeForm, recipeHasItem1);

		const third = screen.getByRole('checkbox', { name: 'third thing' })!;
		const container = third.closest('div');
		await user.click(third);
		if (container !== null) {
			expect(within(container).getByRole('spinbutton', { name: 'Servings' })).toBeVisible();
		}
	});
});

vi.mock('$stores/stores.svelte', async () => {
	let s = $state({ query: 'test' });

	return {
		recipesInventoryFilter: s
	};
});

const recipeHasItem1 = {
	recipe: {
		id: 10,
		name: 'noodles',
		description: 'a lazy meal',
		items: [
			{
				id: 1,
				name: 'First',
				description: 'description goes here',
				servings: 3
			}
		]
	},
	inventoryItems: [
		{
			id: 1,
			name: 'First',
			description: 'description goes here'
		},
		{
			id: 2,
			name: 'Second',
			description: 'also goes here'
		},
		{
			id: 3,
			name: 'third thing',
			description: 'tis but a test'
		}
	]
};
