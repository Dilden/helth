import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';
import { render, screen } from '@testing-library/svelte';
import { click } from '@testing-library/user-event';
import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
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



describe('recipe list', () => {
  beforeEach(async () => {
    indexedDB = new IDBFactory();
    await recipes.init();
  })

  it('has a heading', () => {
    render(Recipes);
    expect(screen.queryByRole('heading', {name: 'Recipes'})).toBeVisible();
  });


  it('gets names of inventory items in recipe', async () => {
    render(Recipes);
    expect(await screen.findByText('Coca-Cola')).toBeInTheDocument();
    expect(await screen.findByText('Syrup')).toBeInTheDocument();
  })
})

describe('add recipe', () => {

  it('has a button for adding recipes', async () => {
    render(Recipes);
    expect(await screen.findByRole('button', {name: 'Add Recipe'})).toBeVisible();
  });
  it('can click the button to toggle form', async () => {
    render(Recipes);

    expect(screen.getByLabelText('Recipe Name')).not.toBeVisible();
    expect(screen.getByLabelText('Recipe Description')).not.toBeVisible();

    await click(screen.queryByRole('button', {name: 'Add Recipe'}));
    expect(screen.getByLabelText('Recipe Name')).toBeVisible();
    expect(screen.getByLabelText('Recipe Description')).toBeVisible();
  })
})
