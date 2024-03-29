import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import CounterOptions from './CounterOptions.svelte';

describe('counter options', () => {
	it('shows slider input', async () => {
		render(CounterOptions, {
			key: 'test-key',
			interval: 4,
			max: 150
		});

		expect(screen.getByRole('menu')).toBeVisible();
		expect(screen.getByLabelText('Adjust -/+ interval')).toBeVisible();
	});

	it('shows a checkbox to hide the counter', async () => {
		render(CounterOptions, {
			key: 'test-key',
			interval: 4,
			max: 150
		});

		expect(screen.getByLabelText('Hide')).toBeVisible();
		expect(screen.getByRole('checkbox')).toBeVisible();
	});
});
