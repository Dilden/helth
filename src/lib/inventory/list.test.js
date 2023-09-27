import "fake-indexeddb/auto";
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/svelte';
import List from './List.svelte';
import { inventory } from '../../stores/stores.js';

describe('inventory list', () => {
  it('has a button + form', () => {
    render(List);
    expect(screen.queryByRole('button', { name: 'Add Item'})).toBeVisible();
    expect(screen.queryByRole('heading', {name: 'Saved Items'})).toBeVisible();
  });

  it('shows a search form', () => {
    render(List);
    expect(screen.getByLabelText('Search')).toBeVisible();
  })

  // idk how to render this with testing-library since the component
  // uses svelte await
  it.skip('shows a list of items', async () => {
    await inventory.set([
      {name: 'Coca-Cola', description: 'A refreshingly acidic beverage'},
      {name: 'Pepsi', description: 'A disgustingly acidic beverage'},
      {name: 'Monster', description: 'You can feel colors'},
    ]);

    render(List);
    const items = screen.getAllByRole('listitem');
    const itemNames = items.map(item => item.textContent);

    expect(itemNames).toEqual([
      expect.stringContaining( 'Coca-Cola' ),
      expect.stringContaining('Pepsi'),
      expect.stringContaining( 'Monster' )
    ]);
  });
})
