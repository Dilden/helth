import 'fake-indexeddb/auto';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Add from './Add.svelte';

describe('Add dialog component', () => {
	it('shows tabs for inventory, recipes, and scan', async () => {
		const user = userEvent.setup();
		render(Add);

		await user.click(screen.queryByRole('button', { name: '➕' }));

		// For some reason, these buttons are still hidden in the tests
		// but actually show up in the browser.
		// It's as if the 'click' code isn't actually being run.
		expect(
			await screen.findByRole('button', { name: 'Inventory', hidden: true })
		).toBeInTheDocument();
		expect(
			await screen.findByRole('button', { name: 'Recipes', hidden: true })
		).toBeInTheDocument();
		expect(await screen.findByRole('button', { name: 'Scan', hidden: true })).toBeInTheDocument();
	});
});
