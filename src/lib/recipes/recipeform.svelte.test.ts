import 'fake-indexeddb/auto';
import { render, screen } from '@testing-library/svelte';
import { it, expect, vi } from 'vitest';
import RecipeForm from './RecipeForm.svelte';

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
	expect(screen.getByLabelText('demo')).not.toBeVisible();
});

vi.mock('$stores/stores.svelte', async () => {
	let s = $state({ query: 'test' });

	return {
		recipesInventoryFilter: s
	};
});
