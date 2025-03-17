import { defaultSettingsStoreValues } from '../../vitest/defaultSettingsStoreValues';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import AddNutrientInputs from './AddNutrientInputs.svelte';

afterEach(() => {
	vi.restoreAllMocks();
});

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
		expect(await screen.findByLabelText('Added Sugars')).toBeVisible();
		expect(await screen.findByLabelText('Fiber')).not.toBeVisible();
		expect(await screen.findByLabelText('Magnesium')).not.toBeVisible();
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
