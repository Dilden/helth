import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import List from './List.svelte';

describe('inventory list', () => {
  it('shows a list of items', () => {
    render(List, {
      inventory: [ 
        { title: 'Coca-Cola' },
        { title: 'Pepsi'},
        { title: 'Monster' }
      ]
    });

    const items = screen.getAllByRole('listitem');
    const itemNames = items.map(item => item.textContent);

    expect(itemNames).toEqual([
      expect.stringContaining( 'Coca-Cola' ),
      expect.stringContaining('Pepsi'),
      expect.stringContaining( 'Monster' )
    ]);
  });
})
