// @ts-ignore
import 'fake-indexeddb/auto';
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import RecipeItem from './RecipeItem.svelte';

describe('recipe items', () => {
	it('shows a recipe title & description', () => {
		render(RecipeItem, {
			recipe: {
				name: 'This is a recipe title',
				description: 'test desc',
				items: []
			}
		});
		expect(screen.getByRole('heading', { name: 'This is a recipe title' })).toBeVisible();
		expect(screen.getByText('test desc')).toBeVisible();
		expect(screen.getByRole('spinbutton', { name: 'Servings' })).toHaveValue(1);
	});
	it('shows inventory items in recipe with quantities summed', () => {
		render(RecipeItem, {
			recipe: {
				name: 'Awful mix',
				description: 'the absolute worst',
				items: [
					{
						name: 'Coca-Cola',
						description: 'a carbonated beverage that will rot your teeth',
						nutrients: [
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
							}
						],
						servings: 1
					},
					{
						name: 'Pepsi',
						description: "god, it's so awful",
						nutrients: [
							{
								key: 'calories',
								name: 'Calories',
								quantity: 250,
								unit: 'kcal'
							},
							{
								key: 'added_sugars',
								name: 'Added Sugars',
								quantity: 500,
								unit: 'g'
							}
						],
						servings: 1
					}
				]
			}
		});
		expect(screen.getByText('Coca-Cola')).toBeVisible();
		expect(screen.getByText('Pepsi')).toBeVisible();
		expect(screen.getByText('Calories: 450kcal')).toBeVisible();
		expect(screen.getByText('Added Sugars: 800g')).toBeVisible();
	});
});
