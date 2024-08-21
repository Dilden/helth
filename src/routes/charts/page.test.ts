import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { defaultSettingsStoreValues } from '../../vitest/defaultSettingsStoreValues';
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

vi.mock('$stores/stores', async () => {
	const { writable } = await import('svelte/store');
	return {
		settings: {
			...writable(defaultSettingsStoreValues),
			set: vi.fn(),
			init: vi.fn()
		},
		limits: {
			...writable([]),
			set: vi.fn(),
			init: vi.fn()
		},
		goals: {
			...writable([]),
			set: vi.fn(),
			init: vi.fn()
		},
		history: {
			...writable([]),
			set: vi.fn(),
			init: vi.fn()
		}
	};
});
