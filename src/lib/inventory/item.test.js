import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Item from './Item.svelte';

describe('inventory items', () => {
  it('shows an item with title', () => {
    render(Item, { title: 'Coca-Cola'});
    expect(screen.queryByText('Coca-Cola')).toBeVisible();
  })
  it('shows actionable buttons on an item', () => {
    render(Item, { title: 'Coca-Cola'});
    expect(screen.queryByRole('button', {name: '➕'})).toBeVisible();
    expect(screen.queryByRole('button', {name: '🖉'})).toBeVisible();
    expect(screen.queryByRole('button', {name: '📑'})).toBeVisible();
    expect(screen.queryByRole('button', {name: '🗑️'})).toBeVisible();
  })
})
