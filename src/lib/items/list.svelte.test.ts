import 'fake-indexeddb/auto';
import { defaultInventory, defaultRecipes } from '../../vitest/defaultInventory';
import { recipes, inventory, q } from '$stores/stores.svelte';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeAll } from 'vitest';
import List from './List.svelte';

beforeAll(async () => {
  for (const item of defaultInventory) {
    await inventory.add(item);
  }
  for (const recipe of defaultRecipes) {
    await recipes.add(recipe);
  }
});

describe('search', () => {
  it('shows all inventory + recipes', async () => {
    render(List);
    expect(await screen.findByRole('heading', { name: 'Water' })).toBeVisible();
    expect(await screen.findByRole('heading', { name: 'Syrup' })).toBeVisible();
    expect(await screen.findByRole('heading', { name: 'Coca-Cola' })).toBeVisible();
    expect(await screen.findByRole('heading', { name: 'toxic waste' })).toBeVisible();
    expect(await screen.findByRole('heading', { name: 'beezchurger' })).toBeVisible();
    expect(await screen.findByRole('heading', { name: 'gnarly mess' })).toBeVisible();
  });
  it('filters everything except given item', async () => {
    q.query = 'Water';
    render(List);
    expect(await screen.findByRole('heading', { name: 'Water' })).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Syrup' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Coca-Cola' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'toxic waste' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'beezchurger' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'gnarly mess' })).not.toBeInTheDocument();
  });
  it('filters everything except given recipe', async () => {
    q.query = 'beezchurger';
    render(List);
    expect(await screen.findByRole('heading', { name: 'beezchurger' })).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Water' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Syrup' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Coca-Cola' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'toxic waste' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'gnarly mess' })).not.toBeInTheDocument();
  });
  it('knows how to display all items', async () => {
    q.query = '';
    render(List);
    expect(screen.queryByRole('paragraph', { name: 'Unknown Item type' })).not.toBeInTheDocument();
  });
});
describe('interface', () => {
  it('has a title', () => {
    render(List);
    expect(screen.getByRole('heading', { name: 'Inventory & Recipes' })).toBeVisible();
  });
  it('shows buttons to add items + recipes', () => {
    render(List);
    expect(screen.getByRole('button', { name: 'Add Item' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Add Recipe' })).toBeVisible();
  });
  it('can show a form to add an item', async () => {
    const user = userEvent.setup();
    render(List);
    await user.click(screen.queryByRole('button', { name: 'Add Item' }) as Element);

    expect(screen.getByLabelText('Name', { selector: 'input' })).toBeVisible();
    expect(screen.getByLabelText('Description', { selector: 'input' })).toBeVisible();
    expect(screen.getByLabelText('Barcode', { selector: 'input' })).toBeVisible();

    expect(screen.queryByRole('button', { name: 'Cancel' })).toBeVisible();
  });
  it('can show a form to add a recipe', async () => {
    const user = userEvent.setup();
    render(List);
    await user.click(screen.queryByRole('button', { name: 'Add Recipe' }) as Element);

    expect(screen.getByLabelText('Recipe Name')).toBeVisible();
    expect(screen.getByLabelText('Recipe Description')).toBeVisible();

    expect(screen.queryByRole('button', { name: 'Cancel' })).toBeVisible();
  });
});
