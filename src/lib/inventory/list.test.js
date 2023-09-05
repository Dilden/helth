import "fake-indexeddb/auto";
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/svelte';
import List from './List.svelte';
import { inventory } from '../../stores/stores.js';

describe('inventory list', () => {
  it.skip('shows a list of items', async () => {
    
    await inventory.set([
      {title: 'Coca-Cola', description: 'A refreshingly acidic beverage'},
      {title: 'Pepsi', description: 'A disgustingly acidic beverage'},
      {title: 'Monster', description: 'You can feel colors'},
    ]);
    await inventory.init();

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
