// import 'fake-indexeddb/auto';
// import { IDBFactory } from 'fake-indexeddb';
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
// import { recipes, inventory } from '$stores/stores.js';
import RecipeItem from './RecipeItem.svelte';

describe('recipe items', () => {
  it('shows a recipe title', () => {
    render(RecipeItem, { name: 'This is a recipe title' });
    expect(screen.getByRole('heading', { name: 'This is a recipe title' })).toBeVisible();
  })
  it('shows inventory items in recipe with quantities summed', () => {
    render(RecipeItem, { 
      name: 'Awful mix',
      items: [
        { 
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
          name: 'Pepsi',
          description: 'god, it\'s so awful',
          nutrients: {
            calories: {
              name: 'Calories',
              quantity: '250',
              unit: 'kcal'
            },
            added_sugars: {
              name: 'Added Sugars',
              quantity: '500',
              unit: 'g'
            }
          }
        }
      ]
    });
    expect(screen.getByText('Coca-Cola')).toBeVisible();
    expect(screen.getByText('Pepsi')).toBeVisible();
    expect(screen.getByText('Calories: 450kcal')).toBeVisible();
    expect(screen.getByText('Added Sugars: 800g')).toBeVisible();
  })
})