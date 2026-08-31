import 'fake-indexeddb/auto';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import AddItem from './AddItem.svelte';
import { defaultSettingsStoreValues } from '../../vitest/defaultSettingsStoreValues';

const coke = {
	name: 'Coca-Cola',
	description: 'tasty carbonated drink',
	nutrients: [
		{
			key: 'calories',
			name: 'Calories',
			quantity: '200',
			unit: 'kcal'
		},
		{
			key: 'added_sugars',
			name: 'Added Sugars',
			quantity: '300',
			unit: 'g'
		}
	]
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
	it('calls the submit callback', async () => {
		const user = userEvent.setup();
		const submit = vi.fn();
		render(AddItem, { item: coke, submitCallback: submit });

		expect(screen.getByLabelText('Name')).toHaveValue('Coca-Cola');
		expect(screen.getByLabelText('Description')).toHaveValue('tasty carbonated drink');
		expect(await screen.findByLabelText('Calories')).toHaveValue('200');
		expect(await screen.findByLabelText('Added Sugars')).toHaveValue('300');

		await user.click(screen.queryByRole('button', { name: 'Save' }) as Element);
		expect(submit).toHaveBeenCalledOnce();
	});
});

vi.mock('$stores/stores.svelte', async () => {
	return {
		settings: {
			get: vi.fn(() => defaultSettingsStoreValues),
			add: vi.fn(),
			update: vi.fn(),
			remove: vi.fn(),
			init: vi.fn(() => Promise.resolve(defaultSettingsStoreValues))
		},
		inventory: {
			update: vi.fn(() => Promise.resolve()),
			add: vi.fn(() => Promise.resolve())
		}
	};
});
