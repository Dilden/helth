import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import CounterOptions from './CounterOptions.svelte';

it('counter options shows slider input', async () => {
	render(CounterOptions, {
		key: 'test-key',
		interval: 4,
		max: 150
	});

	expect(screen.getByRole('menu')).toBeVisible();
	expect(screen.getByLabelText('Adjust -/+ interval')).toBeVisible();
});
