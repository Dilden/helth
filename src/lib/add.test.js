import 'fake-indexeddb/auto';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Add from './Add.svelte';

describe('Add dialog component', () => {
	it('shows tabs for items and scanner', async () => {
		const user = userEvent.setup();
		render(Add);

		await user.click(screen.queryByRole('button', { name: '➕' }));

		// For some reason, these buttons are still hidden in the tests
		// but actually show up in the browser.
		// It's as if the 'click' code isn't actually being run.
		expect(screen.getByRole('button', { name: 'Your Items' })).toBeInTheDocument();
		// expect(
		// 	await screen.findByRole('button', { name: 'Inventory & Recipes', hidden: true })
		// ).toBeInTheDocument();
		// expect(
		// 	await screen.findByRole('button', { name: 'Recipes', hidden: true })
		// ).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Scan' })).toBeInTheDocument();
	});
});
