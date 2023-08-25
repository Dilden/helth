import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Add from './Add.svelte';

const inventory = [ 
  { title: 'Big Mac' },
  { title: 'Whopper' }
]

describe('Add dialog component', () => {
  it('shows tabs for inventory, recipes, and scan', () => {
    render(Add, {inventory});

    const tabs = screen.queryAllByRole('button');
    const tabNames = tabs.map(tab => tab.textContent);
    expect(tabNames).toEqual(
      expect.arrayContaining([
        expect.stringContaining('Inventory'),
        expect.stringContaining('Recipes'),
        expect.stringContaining('Scan')
      ])
    );
  });

  it('accepts inventory data', () => {
    render(Add, {
      inventory: [ 
        { title: 'Big Mac' },
        { title: 'Whopper' }
      ]
    });

    expect(screen.queryByText('Big Mac')).toBeVisible();
    expect(screen.queryByText('Whopper')).toBeVisible();

  })
})
