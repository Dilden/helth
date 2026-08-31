import 'fake-indexeddb/auto';
import { defaultSettingsStoreValues } from '../vitest/defaultSettingsStoreValues';
import { defaultTodayStoreValues } from '../vitest/defaultTodayStore';
import { defaultInventory, defaultRecipes } from '../vitest/defaultInventory';
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

vi.mock('$stores/stores.svelte', async () => {
	// let s = $state({ query: '' });
	let q = $state({ query: '' });
	return {
		history: {
			set: vi.fn(),
			init: vi.fn(async () => Promise.resolve()),
			remove: vi.fn(),
			update: vi.fn(),
			add: vi.fn(),
			get: vi.fn(() => [])
		},
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
		recipes: {
			init: vi.fn(() => Promise.resolve()),
			get: vi.fn(() => defaultRecipes)
		},
		// inventorySearchResults: vi.fn(() => ({ results: defaultInventory })),
		// inventorySearch: s,
		subscription: {
			init: vi.fn(() => Promise.resolve())
		},
		q: q,
		searchResults: vi.fn(() => {
			const x = defaultRecipes.map((r) =>
				r.items.map((i) => defaultInventory.find((y) => y.id == i.id))
			);
			return { results: [...defaultInventory, ...x] };
		})
	};
});
