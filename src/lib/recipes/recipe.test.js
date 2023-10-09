import 'fake-indexeddb/auto';
import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/svelte';
// import { recipes } from '$stores/stores.js';
import { addToList, getListItems } from '$stores/db.js';
import Recipes from './Recipes.svelte';

describe('recipe list', () => {
  beforeAll(async () => {

    // insert some fake data
    const nutrients = [{calories: {name: 'Calories', quantity: '200', unit: 'kcal'}}, {protein: {name: 'Protein', quantity: '20', unit: 'g'}}];
    const fakeItems = [
      {name: 'Chicken', description: 'just some chicken', barcode: '1', nutrients: nutrients},
      {name: 'Rice', description: 'white rice', barcode: '2', nutrients: nutrients},
      {name: 'Noodles', description: 'long tasty and wet', barcode: '3', nutrients: nutrients},
      {name: 'Chocolate', description: 'dark sweetness', barcode: '4', nutrients: nutrients},
      {name: 'Sugar', description: 'light sweetness', barcode: '5', nutrients: nutrients}];
    nutrients.map(async (item) => await addToList('inventory', item));
    const items = await getListItems('inventory');
    console.log(items);
    // const fakeRecipe = {
    //   name: 'Brownies',
    //   description: 'Children will eat this',
    //   items: [
    //     { id: 3, servings: 2 },
    //     { id: 1, servings: 1, }
    //   ]
    // }
    // await addToList('inventory', fakeRecipe);
  });

  it('has a heading', () => {
    render(Recipes);
    expect(screen.queryByRole('heading', {name: 'Recipes'})).toBeVisible();
  });

  it('renders a list of items from the recipe store', async () => {
    const fakeRecipe = {
      name: 'Brownies',
      description: 'Children will eat this',
      items: [
        { id: 3, servings: 2 },
        { id: 1, servings: 1, }
      ]
    }
    await addToList('recipes', fakeRecipe);
    const list = await getListItems('recipes');
    console.log(list);
    // await recipes.set({
    //   name: 'Brownies',
    //   description: 'Children will eat this',
    //   items: [
    //     { id: 3, servings: 2 },
    //     { id: 1, servings: 1, }
    //   ]
    // });
    // await recipes.set({
    //     name: 'Chicken & Rice',
    //     description: 'Healthy meal kids hate',
    //     items: [
    //       {id: 1, servings: 5},
    //       {id: 4, servings: 2},
    //       {id: 2, servings: 1}
    //     ]
    //   }
    // );
    render(Recipes);

    expect(await screen.findByText('Brownies')).toHaveTextContent();
    // expect(await screen.findByText('Chicken & Rice')).toHaveTextContent();
  })
})
