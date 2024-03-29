import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { list } from '$utils/nutrients';
import userEvent from '@testing-library/user-event';
import Counter from './Counter.svelte';

describe('counter component', () => {
	it('renders a counter component with matching props', () => {
		render(Counter, {
			count: 10,
			interval: 4,
			item: { ...list[0], ...{ countMax: 150 } }
		});
		expect(screen.queryByText('🍬 Added Sugars (g)')).toBeVisible();
		expect(screen.queryByLabelText('🍬 Added Sugars (g)')).toHaveValue(10);
		expect(screen.queryByRole('button', { name: '-4' })).toBeVisible();
		expect(screen.queryByRole('button', { name: '+4' })).toBeVisible();
	});

	it('changes the count value when a button is clicked', async () => {
		const user = userEvent.setup();
		render(Counter, {
			count: 5,
			interval: 2,
			item: { ...list[0], ...{ countMax: 150 } }
		});
		await user.click(screen.getByRole('button', { name: '-2' }));
		expect(screen.queryByLabelText('🍬 Added Sugars (g)')).toHaveValue(3);
	});

	it('clicking options button shows controls', async () => {
		const user = userEvent.setup();
		render(Counter, {
			count: 10,
			interval: 4,
			item: { ...list[0], ...{ countMax: 150 } }
		});

		expect(screen.queryByLabelText('Adjust -/+ interval')).toBeNull();

		await user.click(screen.getByRole('button', { name: '...' }));
		expect(screen.queryByLabelText('Adjust -/+ interval')).toBeVisible();
	});

	it('clicking outside of options hides controls', async () => {
		const user = userEvent.setup();
		render(Counter, {
			count: 10,
			item: { ...list[0], ...{ countMax: 150 } },
			interval: 4
		});

		await user.click(screen.getByRole('button', { name: '...' }));
		expect(screen.queryByLabelText('Adjust -/+ interval')).toBeVisible();

		await user.click(screen.getByLabelText('🍬 Added Sugars (g)'));

		expect(screen.queryByLabelText('Adjust -/+ interval')).toBeNull();
	});
});
