import 'fake-indexeddb/auto';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach, beforeAll, beforeEach } from 'vitest';
import Recipes from './Recipes.svelte';

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

		await user.click(screen.queryByRole('button', { name: 'Add Recipe' }));

		expect(screen.getByLabelText('Recipe Name')).toBeVisible();
		expect(screen.getByLabelText('Recipe Description')).toBeVisible();
	});

	it('has a search bar', async () => {
		render(Recipes);
		expect(screen.getByLabelText('Search Recipes')).toBeVisible();
	});
});

vi.mock('$stores/stores', async () => {
	const { writable } = await import('svelte/store');
	return {
		recipeSearch: {
			...writable(0),
			set: vi.fn(),
			init: vi.fn()
		},
		inventory: {
			...writable([
				{
					id: 1,
					name: 'Coca-Cola',
					description: 'a carbonated beverage that will rot your teeth',
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
				},
				{
					id: 2,
					name: 'Water',
					description: 'hydrohomie 4 life',
					nutrients: {
						calories: {
							name: 'Calories',
							quantity: '0',
							unit: 'kcal'
						}
					}
				},
				{
					id: 3,
					name: 'Syrup',
					description: 'sticky',
					nutrients: {
						calories: {
							name: 'Calories',
							quantity: '400',
							unit: 'kcal'
						}
					}
				}
			]),
			set: vi.fn(),
			init: vi.fn(async () =>
				Promise.resolve([
					{
						id: 1,
						name: 'Coca-Cola',
						description: 'a carbonated beverage that will rot your teeth',
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
					},
					{
						id: 2,
						name: 'Water',
						description: 'hydrohomie 4 life',
						nutrients: {
							calories: {
								name: 'Calories',
								quantity: '0',
								unit: 'kcal'
							}
						}
					},
					{
						id: 3,
						name: 'Syrup',
						description: 'sticky',
						nutrients: {
							calories: {
								name: 'Calories',
								quantity: '400',
								unit: 'kcal'
							}
						}
					}
				])
			)
		},
		formattedRecipes: {
			...writable([
				Promise.resolve([
					{
						name: 'test-item',
						description: 'test description',
						items: [
							{
								servings: 1,
								id: 12,
								name: 'cheese',
								description: 'cheese',
								barcode: '0075450127140',
								nutrients: [
									{
										name: 'Calcium',
										unit: 'mg',
										quantity: 200,
										key: 'calcium'
									},
									{
										name: 'Calories',
										unit: 'kcal',
										quantity: 110,
										key: 'calories'
									}
								]
							},
							{
								servings: 1,
								id: 128,
								name: 'bread',
								description: 'bread',
								barcode: '0072945715882',
								nutrients: [
									{
										key: 'calories',
										name: 'Calories',
										unit: 'kcal',
										quantity: 90
									},
									{
										key: 'fiber',
										name: 'Fiber',
										unit: 'g',
										quantity: 3
									}
								]
							}
						],
						id: 25
					}
				])
			]),
			set: vi.fn(),
			init: vi.fn()
		},
		today: {
			...writable(0),
			set: vi.fn(),
			init: vi.fn()
		},
		recipes: {
			...writable(0),
			set: vi.fn(),
			init: vi.fn()
		},
		inventoryFilter: {
			...writable(''),
			set: vi.fn(),
			init: vi.fn()
		}
	};
});
