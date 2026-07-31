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

		expect(await screen.findByText('Your Items')).toBeInTheDocument();
		expect(await screen.findByText('Scan')).toBeInTheDocument();
	});
});
