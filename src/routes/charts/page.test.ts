import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { defaultSettingsStoreValues } from '../../vitest/defaultSettingsStoreValues';
import { defaultGoalStore, defaultLimitStore } from '../../vitest/defaultGoalLimitStore';
import Page from './+page.svelte';

describe('history range filters', () => {
	it('has a select/dropdown with options', () => {
		render(Page);
		expect(screen.getByLabelText('Show previous')).toHaveValue('7');
	});
});

describe('chart', () => {
	it('only shows charts enabled in settings', async () => {
		render(Page);
		expect(await screen.findByRole('heading', { name: 'Added Sugars' })).toBeInTheDocument();
		expect(await screen.findByRole('heading', { name: 'Calories' })).toBeInTheDocument();
		expect(screen.queryByRole('heading', { name: 'Calcium' })).not.toBeInTheDocument();
		expect(screen.queryByRole('heading', { name: 'Fiber' })).not.toBeInTheDocument();
	});
});

afterEach(() => {
	vi.restoreAllMocks();
});

vi.mock('$stores/stores.svelte', () => {
	return {
		settings: {
			set: vi.fn(),
			init: vi.fn(async () => Promise.resolve(defaultSettingsStoreValues)),
			remove: vi.fn(),
			update: vi.fn(),
			get: vi.fn(() => defaultSettingsStoreValues)
		},
		goals: {
			set: vi.fn(),
			init: vi.fn(async () => Promise.resolve()),
			remove: vi.fn(),
			update: vi.fn(),
			get: vi.fn(() => defaultGoalStore)
		},
		limits: {
			set: vi.fn(),
			init: vi.fn(async () => Promise.resolve()),
			remove: vi.fn(),
			update: vi.fn(),
			get: vi.fn(() => defaultLimitStore)
		},
		history: {
			set: vi.fn(),
			init: vi.fn(async () => Promise.resolve()),
			remove: vi.fn(),
			update: vi.fn(),
			add: vi.fn(),
			get: vi.fn(() => [])
		}
	};
});

vi.mock('chart.js');
