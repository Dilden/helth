import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Item from './Item.svelte';

describe('inventory items', () => {
  it('shows an item with title', () => {
    render(Item, { name: 'Coca-Cola'});
    expect(screen.queryByText('Coca-Cola')).toBeVisible();
  })
  it('shows actionable buttons on an item', () => {
    render(Item, { name: 'Coca-Cola'});

    const buttons = screen.queryAllByRole('button');
    const buttonTypes = buttons.map(button => button.textContent);

    expect(buttonTypes).toEqual([
      expect.stringContaining('➕'),
      expect.stringContaining('🖉'),
      expect.stringContaining('📑'),
      expect.stringContaining('🗑️')
    ])
  })
})
