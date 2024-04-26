import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import AddNutrientInputs from './AddNutrientInputs.svelte';

describe('add nutrients to an item form inputs', () => {
	it('has a section title', () => {
		render(AddNutrientInputs);
		expect(screen.getByRole('heading', { name: 'Nutrients' })).toBeVisible();
	});
	it('has inputs for each tracked nutrient', async () => {
		render(AddNutrientInputs);
		expect(await screen.findByLabelText('Calories')).toBeVisible();
		expect(await screen.findByLabelText('Cholesterol')).toBeVisible();
		expect(await screen.findByLabelText('Total Sugars')).toBeVisible();
		expect(await screen.findByLabelText('Sodium')).toBeVisible();
		expect(await screen.findByLabelText('Added Sugars')).toBeInTheDocument();
		expect(await screen.findByLabelText('Added Sugars')).not.toBeVisible();
		expect(await screen.findByLabelText('Fiber')).not.toBeVisible();
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
	it('can accept a nutrients object and populate field values', async () => {
		render(AddNutrientInputs, { nutrients });

		expect(await screen.findByLabelText('Calories')).toHaveValue('200');
		expect(await screen.findByLabelText('Added Sugars')).toHaveValue('300');
		expect(await screen.findByLabelText('Sodium')).toHaveValue('26');
		expect(await screen.findByLabelText('Fiber')).toHaveValue('');
	});
});

vi.mock('$stores/stores', async () => {
	const mockSettingsValues = {
		added_sugars: { name: 'added_sugars', value: { interval: 50, enabled: false } },
		calcium: {
			name: 'calcium',
			value: {
				interval: 34,
				enabled: false
			}
		},
		calories: { name: 'calories', value: { interval: 100, enabled: true } },
		cholesterol: { name: 'cholesterol', value: { interval: 100, enabled: true } },
		total_sugars: { name: 'total_sugars', value: { interval: 100, enabled: true } },
		sodium: { name: 'sodium', value: { interval: 50, enabled: true } },
		fiber: { name: 'fiber', value: { interval: 50, enabled: false } },
		copper: { name: 'copper', value: { interval: 5, enabled: false } },
		folic_acid: { name: 'folic_acid', value: { interval: 5, enabled: false } },
		iodine: { name: 'iodine', value: { interval: 5, enabled: false } },
		iron: { name: 'iron', value: { interval: 5, enabled: false } },
		magnesium: { name: 'magnesium', value: { interval: 5, enabled: false } },
		niacin: { name: 'niacin', value: { interval: 5, enabled: false } },
		phosphorus: { name: 'phosphorus', value: { interval: 5, enabled: false } },
		potassium: { name: 'potassium', value: { interval: 5, enabled: false } },
		protein: { name: 'protein', value: { interval: 25, enabled: true } },
		riboflavin: { name: 'riboflavin', value: { interval: 5, enabled: false } },
		saturated_fat: { name: 'saturated_fat', value: { interval: 5, enabled: false } },
		thiamin: { name: 'thiamin', value: { interval: 5, enabled: false } },
		total_carbohydrate: { name: 'total_carbohydrate', value: { interval: 5, enabled: false } },
		total_fat: { name: 'total_fat', value: { interval: 5, enabled: false } },
		total_sugar: { name: 'total_sugar', value: { interval: 5, enabled: true } },
		trans_fat: { name: 'trans_fat', value: { interval: 5, enabled: false } },
		vitamin_a: { name: 'vitamin_a', value: { interval: 5, enabled: false } },
		vitamin_b: { name: 'vitamin_b', value: { interval: 5, enabled: false } },
		vitamin_b12: { name: 'vitamin_b12', value: { interval: 5, enabled: false } },
		vitamin_b6: { name: 'vitamin_b6', value: { interval: 5, enabled: false } },
		vitamin_c: { name: 'vitamin_c', value: { interval: 5, enabled: false } },
		vitamin_d: { name: 'vitamin_d', value: { interval: 5, enabled: false } },
		vitamin_e: { name: 'vitamin_e', value: { interval: 5, enabled: false } },
		water: { name: 'water', value: { interval: 381, enabled: true } },
		zinc: { name: 'zinc', value: { interval: 5, enabled: false } }
	};
	const { writable } = await import('svelte/store');
	return {
		settings: {
			...writable(mockSettingsValues),
			set: vi.fn(),
			init: vi.fn()
		}
	};
});
