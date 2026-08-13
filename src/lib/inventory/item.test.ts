// @ts-ignore
import 'fake-indexeddb/auto';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Item from './Item.svelte';
import { defaultSettingsStoreValues } from '../../vitest/defaultSettingsStoreValues';

vi.mock('$stores/stores.svelte', async () => {
	return {
		settings: {
			get: vi.fn(() => defaultSettingsStoreValues),
			add: vi.fn(),
			update: vi.fn(),
			remove: vi.fn(),
			init: vi.fn(() => Promise.resolve())
		}
	};
});
const coke = {
	name: 'Coca-Cola',
	description: 'a carbonated beverage that will rot your teeth',
	created: 1782,
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

describe('inventory items', () => {
	it('shows an item with title', () => {
		render(Item, { item: { name: 'Coca-Cola' } });
		expect(screen.queryByText('Coca-Cola')).toBeVisible();
		expect(screen.queryByText('Item')).toBeVisible();
	});

	it('shows actionable buttons on an item', () => {
		render(Item, { item: { name: 'Coca-Cola' } });

		const buttons = screen.queryAllByRole('button');
		const buttonTypes = buttons.map((button) => button.textContent);

		expect(buttonTypes).toEqual([
			expect.stringContaining('➕'),
			expect.stringContaining('✏️'),
			expect.stringContaining('⏩'),
			expect.stringContaining('🗑️')
		]);
	});
	it('shows several nutrients listed below name', () => {
		render(Item, { item: coke });

		expect(screen.getByText('Calories: 200kcal')).toBeVisible();
		expect(screen.getByText('Added Sugars: 300g')).toBeVisible();
	});
});

describe('item control interactions', () => {
	it('shows a number input next to plus ➕ button', () => {
		render(Item, { item: coke });
		expect(screen.getByRole('spinbutton', { name: 'Servings' })).toHaveValue(1);
	});

	it('shows a form when editing', async () => {
		const user = userEvent.setup();
		render(Item, { item: coke });

		await user.click(screen.queryByRole('button', { name: '✏️' }) as Element);

		expect(screen.getByLabelText('Name')).toHaveValue('Coca-Cola');
		expect(screen.getByLabelText('Description')).toHaveValue(
			'a carbonated beverage that will rot your teeth'
		);
		expect(screen.getByLabelText('Calories')).toHaveValue('200');
		expect(screen.getByLabelText('Added Sugars')).toHaveValue('300');
	});
});
