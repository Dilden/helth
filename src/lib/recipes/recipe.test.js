import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import { recipes, inventory } from '$stores/stores.js';
import Recipes from './Recipes.svelte';

beforeAll(async () => {
  indexedDB = new IDBFactory();
  await recipes.init();
  await inventory.set({ 
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
  });
  await inventory.set({ 
    name: 'Water',
    description: 'hydrohomie 4 life',
    nutrients: {
      calories: {
        name: 'Calories',
        quantity: '0',
        unit: 'kcal'
      }
    }
  });
  await inventory.set({ 
    name: 'Syrup',
    description: 'sticky',
    nutrients: {
      calories: {
        name: 'Calories',
        quantity: '400',
        unit: 'kcal'
      }
    }
  });
});

describe.sequential('recipe list', () => {

  it('has a heading', () => {
    render(Recipes);
    expect(screen.queryByRole('heading', {name: 'Recipes'})).toBeVisible();
  });

  it('shows recipe titles from the recipe store', async () => {
    await recipes.set({
      name: 'Brownies',
      description: 'Children will eat this',
      items: [
        { id: 3, servings: 2 },
        { id: 1, servings: 1, }
      ]
    });
    render(Recipes);

    expect(await screen.findByText('Brownies')).toBeVisible();
  })

  it('gets names of inventory items in recipe', async () => {
    render(Recipes);
    expect(await screen.findByText('Coca-Cola')).toBeVisible();
    expect(await screen.findByText('Syrup')).toBeVisible();
  })
})
