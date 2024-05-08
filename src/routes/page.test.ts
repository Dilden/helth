import 'fake-indexeddb/auto';
import { defaultSettingsStoreValues } from '../vitest/defaultSettingsStoreValues';
import { it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

afterEach(() => {
	vi.restoreAllMocks();
});

it('shows counters for all nutrients', async () => {
	render(Page);
	expect(await screen.findByText('Cholesterol (mg)')).toBeVisible();
	expect(await screen.findByText('🍗 Protein (g)')).toBeVisible();
	expect(await screen.findByText('🍌 Potassium (mg)')).toBeVisible();
	expect(await screen.findByText('Zinc (mg)')).toBeVisible();
	expect(await screen.findByText('☕ Caffeine (mg)')).toBeVisible();
});

vi.mock('$stores/stores', async () => {
	const { writable } = await import('svelte/store');
	return {
		settings: {
			...writable(defaultSettingsStoreValues),
			set: vi.fn(),
			init: vi.fn()
		},
		today: {
			...writable([]),
			set: vi.fn(),
			init: vi.fn()
		},
		limits: {
			...writable({
				value: 0
			}),
			set: vi.fn(),
			init: vi.fn()
		},
		goals: {
			...writable({
				value: 0
			}),
			set: vi.fn(),
			init: vi.fn()
		},
		searchTerm: {
			...writable(''),
			set: vi.fn(),
			init: vi.fn()
		},
		filteredInventory: {
			...writable([]),
			set: vi.fn(),
			init: vi.fn()
		},
		inventoryFilter: {
			...writable(''),
			set: vi.fn(),
			init: vi.fn()
		},
		inventory: {
			...writable([]),
			set: vi.fn(),
			init: vi.fn()
		},
		recipes: {
			...writable([]),
			set: vi.fn(),
			init: vi.fn()
		}
	};
});
