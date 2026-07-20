import 'fake-indexeddb/auto';
import { defaultInventory, defaultRecipes } from '../../vitest/defaultInventory';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import List from './List.svelte';

// afterEach(() => {
// 	vi.restoreAllMocks();
// });

describe.skip('search', () => {
  it('shows all inventory + recipes', () => { });
  it('only shows inventory item when searched by it', () => { });
  it('only shows recipe when searched by it', () => { });
});
describe('interface', () => {
  it('has a title', () => {
    render(List);
    expect(screen.getByRole('heading', { name: 'Inventory & Recipes' })).toBeVisible();
  });
  it.skip('has a button to add inventory items', () => { });
  it.skip('shows a form to add inventory items', () => { });
  it.skip('has a button to add recipes', () => { });
  it.skip('shows a form to add recipes', () => { });
});
