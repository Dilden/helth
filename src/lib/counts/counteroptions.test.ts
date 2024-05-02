import { defaultSettingsStoreValues } from '../../vitest/defaultSettingsStoreValues';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import CounterOptions from './CounterOptions.svelte';

describe('counter options', () => {
	it('shows slider input', async () => {
		render(CounterOptions, {
			key: 'calories',
			interval: 4,
			max: 150
		});

		expect(screen.getByRole('menu')).toBeVisible();
		expect(screen.getByLabelText('Adjust -/+ interval')).toBeVisible();
	});

	it('shows a checkbox to hide the counter', async () => {
		render(CounterOptions, {
			key: 'calories',
			interval: 4,
			max: 150
		});

		expect(screen.getByLabelText('Show this counter?')).toBeVisible();
		expect(screen.getByRole('checkbox')).toBeVisible();
	});
});

vi.mock('$stores/stores', async () => {
	const { writable } = await import('svelte/store');
	return {
		settings: {
			...writable(defaultSettingsStoreValues),
			set: vi.fn(),
			init: vi.fn()
		}
	};
});
