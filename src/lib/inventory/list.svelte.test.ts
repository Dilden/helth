import 'fake-indexeddb/auto';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { defaultInventory } from '../../vitest/defaultInventory';
import List from './List.svelte';

afterEach(() => {
	vi.restoreAllMocks();
});

describe('inventory list', () => {
	it('has a button + form', () => {
		render(List);
		expect(screen.queryByRole('button', { name: 'Add Item' })).toBeVisible();
		expect(screen.queryByRole('heading', { name: 'Saved Items' })).toBeVisible();
	});

	it('shows a search form', () => {
		render(List);
		expect(screen.getByLabelText('Search')).toBeVisible();
	});

	it('shows a list of items', async () => {
		render(List);
		expect(await screen.findByText('Coca-Cola')).toBeVisible();
		expect(await screen.findByText('Water')).toBeVisible();
		expect(await screen.findByText('Syrup')).toBeVisible();
	});
});

vi.mock('$stores/stores.svelte', async () => {
	let s = $state({ query: '' });
	return {
		inventory: {
			add: vi.fn(),
			init: vi.fn(async () => Promise.resolve(defaultInventory)),
			remove: vi.fn(),
			update: vi.fn(),
			get: vi.fn(() => defaultInventory)
		},
		inventorySearchResults: vi.fn(() => ({ results: defaultInventory })),
		inventorySearch: s
	};
});

vi.mock('$stores/stores', async () => {
	const { writable } = await import('svelte/store');
	return {
		today: {
			...writable(0),
			set: vi.fn(),
			init: vi.fn()
		}
	};
});
