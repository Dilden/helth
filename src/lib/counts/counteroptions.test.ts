import { defaultSettingsStoreValues } from '../../vitest/defaultSettingsStoreValues';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import CounterOptions from './CounterOptions.svelte';

afterEach(() => {
	vi.restoreAllMocks();
});

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

	it('has buttons to adjust position', async () => {
		render(CounterOptions, {
			key: 'calories',
			interval: 4,
			max: 150
		});

		expect(screen.getByRole('button', { name: '⬆️ Move Up' })).toBeVisible();
		expect(screen.getByRole('button', { name: '⬇️ Move Down' })).toBeVisible();
	});

	it('calls callback on Move button clicks', () => {
		const spy = vi.fn();
		render(CounterOptions, {
			key: 'calories',
			interval: 4,
			max: 150,
			moveUpCallback: spy,
			moveDownCallback: spy
		});

		screen.getByRole('button', { name: '⬆️ Move Up' }).click();
		expect(spy).toHaveBeenCalledOnce();
		screen.getByRole('button', { name: '⬇️ Move Down' }).click();
		expect(spy).toHaveBeenCalledTimes(2);
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
