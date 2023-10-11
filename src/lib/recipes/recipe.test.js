import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import { recipes } from '$stores/stores.js';
import Recipes from './Recipes.svelte';

beforeAll(async () => {
  indexedDB = new IDBFactory();
  await recipes.init();
});

describe('recipe list', () => {

  it('has a heading', () => {
    render(Recipes);
    expect(screen.queryByRole('heading', {name: 'Recipes'})).toBeVisible();
  });

  it('renders a list of items from the recipe store', async () => {
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
})
