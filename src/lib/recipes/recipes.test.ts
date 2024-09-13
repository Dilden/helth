import 'fake-indexeddb/auto';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Recipes from './Recipes.svelte';
// import { recipeMock } from '$vitest/mockStores';

// recipeMock();

afterEach(() => {
	vi.restoreAllMocks();
});

describe('recipe list', () => {
	it('has a heading', () => {
		render(Recipes);
		expect(screen.queryByRole('heading', { name: 'Recipes' })).toBeVisible();
	});
});

describe('add recipe', () => {
	it('has a button for adding recipes', async () => {
		render(Recipes);
		expect(await screen.findByRole('button', { name: 'Add Recipe' })).toBeVisible();
	});
	it('can click the button to toggle form', async () => {
		const user = userEvent.setup();
		render(Recipes);

		await user.click(screen.queryByRole('button', { name: 'Add Recipe' }) as Element);

		expect(screen.getByLabelText('Recipe Name')).toBeVisible();
		expect(screen.getByLabelText('Recipe Description')).toBeVisible();
	});

	it('has a search bar', async () => {
		render(Recipes);
		expect(screen.getByLabelText('Search Recipes')).toBeVisible();
	});
});

describe('recipe list items', () => {
	it('shows mocked recipe items in a list', async () => {
		render(Recipes);
		expect(await screen.findByRole('heading', { name: 'Crackers and Cheese' })).toBeVisible();
	});
	it('has a duplicate button', async () => {
		render(Recipes);
		expect(await screen.findByRole('button', { name: '⏩' })).toBeVisible();
	});
});

vi.mock('$stores/stores', async () => {
	const { writable, derived } = await import('svelte/store');
	const defaultRecipes = [
		Promise.resolve({
			name: 'Crackers and Cheese',
			description: 'Wheat thins with sliced cheese',
			items: [
				{
					servings: 1,
					id: 237,
					name: 'Colby jack cheese block',
					description: '1oz serving size',
					barcode: '0075450094084',
					nutrients: [
						{
							key: 'calcium',
							name: 'Calcium',
							quantity: 200,
							unit: 'mg'
						},
						{
							key: 'calories',
							name: 'Calories',
							quantity: 110,
							unit: 'kcal'
						},
						{
							key: 'cholesterol',
							name: 'Cholesterol',
							quantity: 30,
							unit: 'mg'
						},
						{
							key: 'protein',
							name: 'Protein',
							quantity: 6,
							unit: 'g'
						},
						{
							key: 'sodium',
							name: 'Sodium',
							quantity: 200,
							unit: 'mg'
						},
						{
							key: 'total_fat',
							name: 'Total Fat',
							quantity: 9,
							unit: 'g'
						}
					]
				},
				{
					servings: 1,
					id: 107,
					name: 'Reduced Fat Wheat Thins',
					description:
						"whole grain wheat flour, sugar, canola oil, cornstarch, malt syrup (corn, barley), salt, refiner's syrup, leavening (calcium phosphate, baking soda), bht.",
					barcode: '0044000069193',
					nutrients: [
						{
							key: 'calories',
							name: 'Calories',
							unit: 'kcal',
							quantity: 134
						},
						{
							key: 'fiber',
							name: 'Fiber',
							unit: 'g',
							quantity: 3
						},
						{
							key: 'protein',
							name: 'Protein',
							unit: 'g',
							quantity: 2
						},
						{
							key: 'sodium',
							name: 'Sodium',
							unit: 'mg',
							quantity: 0
						},
						{
							key: 'total_fat',
							name: 'Total Fat',
							unit: 'g',
							quantity: 4
						}
					]
				}
			],
			id: 41
		})
	];
	const defaultInventory = [
		{
			id: 1,
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
		},
		{
			id: 2,
			name: 'Water',
			description: 'hydrohomie 4 life',
			nutrients: [
				{
					key: 'calories',
					name: 'Calories',
					quantity: '0',
					unit: 'kcal'
				}
			]
		},
		{
			id: 3,
			name: 'Syrup',
			description: 'sticky',
			nutrients: [
				{
					key: 'calories',
					name: 'Calories',
					quantity: '400',
					unit: 'kcal'
				}
			]
		}
	];

	return {
		formattedRecipes: {
			...derived(writable(''), () => defaultRecipes, defaultRecipes)
		},
		recipeSearch: {
			...writable(0),
			set: vi.fn(),
			init: vi.fn()
		},
		recipes: {
			...writable(0),
			set: vi.fn(),
			init: vi.fn(),
			delete: vi.fn()
		},
		inventory: {
			...writable(defaultInventory),
			set: vi.fn(),
			init: vi.fn(async () => Promise.resolve(defaultInventory)),
			delete: vi.fn()
		},
		inventoryFilter: {
			...writable(''),
			set: vi.fn(),
			init: vi.fn()
		},
		today: {
			...writable(''),
			set: vi.fn(),
			init: vi.fn(),
			setDate: vi.fn()
		}
	};
});
