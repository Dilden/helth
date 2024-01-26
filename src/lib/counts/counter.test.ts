import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Counter from './Counter.svelte';

describe('counter component', () => {
	it('renders a counter component with matching props', () => {
		const title = 'counter test';
		render(Counter, {
			count: 10,
			title: title,
			interval: 4,
			max: 150,
			diffString: '100 calories remaining'
		});
		expect(screen.queryByText(title)).toBeVisible();
		expect(screen.queryByLabelText(`${title}`)).toHaveValue(10);
		expect(screen.queryByRole('button', { name: '-4' })).toBeVisible();
		expect(screen.queryByRole('button', { name: '+4' })).toBeVisible();
	});

	it('changes the count value when a button is clicked', async () => {
    const user = userEvent.setup();
		const title = 'test';
		render(Counter, {
			count: 5,
			title: title,
			interval: 2
		});
		await user.click( screen.getByRole('button', { name: '-2' }) );
		expect(screen.queryByLabelText(`${title}`)).toHaveValue(3);
	});

	it('clicking options button shows controls', async () => {
    const user = userEvent.setup();
		const title = 'options test';
		render(Counter, {
			count: 10,
			title: title,
			interval: 4,
			max: 150,
			diffString: '100 calories remaining'
		});

		expect(
      screen.queryByLabelText(`Adjust interval for ${title}`)
    ).not.toBeVisible();
    expect(screen.queryByRole('button', { name: '...' })).toBeVisible();

		await user.click(screen.getByRole('button', { name: '...' }));
		expect(
      screen.queryByLabelText(`Adjust interval for ${title}`)
    ).toBeVisible();
	});
});
