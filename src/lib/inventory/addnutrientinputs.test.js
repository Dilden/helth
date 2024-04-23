import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import AddNutrientInputs from './AddNutrientInputs.svelte';

describe('add nutrients to an item form inputs', () => {
	it('has a section title', () => {
		render(AddNutrientInputs);
		expect(screen.getByRole('heading', { name: 'Nutrients' })).toBeVisible();
	});
	it('has inputs for each tracked nutrient', () => {
		render(AddNutrientInputs);
		expect(screen.getByLabelText('Calories')).toBeVisible();
		expect(screen.getByLabelText('Cholesterol')).toBeVisible();
		expect(screen.getByLabelText('Total Sugars')).toBeVisible();
		expect(screen.getByLabelText('Added Sugars')).not.toBeVisible();
	});
});

describe('accepts nutrients', () => {
	const nutrients = [
		{
			key: 'calories',
			name: 'Calories',
			quantity: 200,
			unit: 'kcal'
		},
		{
			key: 'added_sugars',
			name: 'Added Sugars',
			quantity: 300,
			unit: 'g'
		},
		{
			key: 'sodium',
			name: 'Sodium',
			quantity: 26,
			unit: 'g'
		}
	];
	it('can accept a nutrients object and populate field values', () => {
		render(AddNutrientInputs, { nutrients });
		expect(screen.getByLabelText('Calories')).toHaveValue('200');
		expect(screen.getByLabelText('Added Sugars')).toHaveValue('300');
		expect(screen.getByLabelText('Sodium')).toHaveValue('26');
		expect(screen.getByLabelText('Fiber')).toHaveValue('');
	});
});
