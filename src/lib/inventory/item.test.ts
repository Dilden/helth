// @ts-ignore
import 'fake-indexeddb/auto';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Item from './Item.svelte';

const coke = {
	name: 'Coca-Cola',
	description: 'a carbonated beverage that will rot your teeth',
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
	});

	it('shows actionable buttons on an item', () => {
		render(Item, { item: { name: 'Coca-Cola' } });

		const buttons = screen.queryAllByRole('button');
		const buttonTypes = buttons.map((button) => button.textContent);

		expect(buttonTypes).toEqual([
			expect.stringContaining('➕'),
			// expect.stringContaining('📑'),
			expect.stringContaining('🗑️')
		]);
	});
	it('shows several nutrients listed below name', () => {
		render(Item, { item: coke });

		expect(screen.getByText('Calories: 200kcal')).toBeVisible();
		expect(screen.getByText('Added Sugars: 300g')).toBeVisible();
	});
});

describe('add to daily total', () => {
	it('shows a number input next to plus ➕ button', () => {
		render(Item, { item: coke });
		expect(screen.getByRole('spinbutton', { name: 'Servings' })).toHaveValue(1);
	});
});
