import 'fake-indexeddb/auto';
import { defaultSettingsStoreValues } from '../vitest/defaultSettingsStoreValues';
import { defaultTodayStoreValues } from '../vitest/defaultTodayStore';
import { defaultInventory } from '../vitest/defaultInventory';
import { defaultLimitStore, defaultGoalStore } from '../vitest/defaultGoalLimitStore';
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

// vi.mock('$stores/stores', async () => {
// 	const { writable } = await import('svelte/store');
// 	return {
// 		history: {
// 			...writable([]),
// 			set: vi.fn(),
// 			init: vi.fn()
// 		}
// 	};
// });

vi.mock('$stores/stores.svelte', async () => {
	let s = $state({ query: '' });
	return {
		goals: {
			init: vi.fn(() => Promise.resolve()),
			add: vi.fn(),
			update: vi.fn(),
			get: vi.fn(() => defaultGoalStore),
			remove: vi.fn()
		},
		limits: {
			init: vi.fn(() => Promise.resolve()),
			add: vi.fn(),
			update: vi.fn(),
			get: vi.fn(() => defaultLimitStore),
			remove: vi.fn()
		},
		settings: {
			init: vi.fn(() => Promise.resolve()),
			add: vi.fn(),
			update: vi.fn(),
			get: vi.fn(() => defaultSettingsStoreValues),
			remove: vi.fn()
		},
		today: {
			init: vi.fn(() => Promise.resolve()),
			add: vi.fn(),
			update: vi.fn(),
			get: vi.fn(() => defaultTodayStoreValues),
			setDate: vi.fn(),
			remove: vi.fn()
		},
		inventory: {
			init: vi.fn(() => Promise.resolve()),
			get: vi.fn(() => defaultInventory)
		},
		inventorySearchResults: vi.fn(() => ({ results: defaultInventory })),
		inventorySearch: s
	};
});
