import 'fake-indexeddb/auto';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import AddItem from './AddItem.svelte';

const coke = {
	name: 'Coca-Cola',
	description: 'tasty carbonated drink',
	nutrients: {
		calories: {
			name: 'Calories',
			quantity: '200',
			unit: 'kcal'
		},
		added_sugars: {
			name: 'Added Sugars',
			quantity: '300',
			unit: 'g'
		}
	}
};
describe('add item to inventory form', () => {
	it('populates the form when provided an item', () => {
		render(AddItem, { item: coke });

		expect(screen.queryByLabelText('Name')).toHaveValue('Coca-Cola');
		expect(screen.queryByLabelText('Barcode')).toHaveValue('');
	});

	it('calls the cancel callback fn', async () => {
		const user = userEvent.setup();
		const cancel = vi.fn();
		render(AddItem, { item: coke, cancelCallback: cancel });

		await user.click(screen.queryByRole('button', { name: 'Cancel' }) as Element);
		expect(cancel).toHaveBeenCalledOnce();
	});
});
