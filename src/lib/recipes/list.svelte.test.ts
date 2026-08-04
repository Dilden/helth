import 'fake-indexeddb/auto';
import { defaultInventory, defaultRecipes } from '../../vitest/defaultInventory';
import { recipes, inventory, searchResults, q } from '$stores/stores.svelte';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeAll } from 'vitest';
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
  it('has buttons to manipulate inventory items', () => {
    render(List);
    expect(screen.getByRole('button', { name: '➕' })).toBeVisible();
    expect(screen.getByRole('button', { name: '✏️' })).toBeVisible();
    expect(screen.getByRole('button', { name: '⏩' })).toBeVisible();
    expect(screen.getByRole('button', { name: '🗑️' })).toBeVisible();
  });
  it.skip('shows a form to add inventory items', () => { });
  it.skip('shows a form to edit inventory items', () => { });
  it.skip('has buttons to manipulate recipes', () => { });
  it.skip('shows a form to add recipes', () => { });
  it.skip('shows a form to edit recipes', () => { });
});
