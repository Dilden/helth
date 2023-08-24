import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import List from './List.svelte';

describe('inventory list', () => {
  it('shows a list of items', () => {
    render(List, {data: [ 
      { title: 'Coca-Cola' },
      { title: 'Pepsi'},
      { title: 'Monster' }
    ]});

    expect(screen.queryByText('Coca-Cola')).toBeVisible();
    expect(screen.queryByText('Pepsi')).toBeVisible();
    expect(screen.queryByText('Monster')).toBeVisible();
  });
})
