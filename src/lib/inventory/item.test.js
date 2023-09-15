import 'fake-indexeddb/auto';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { click } from '@testing-library/user-event';
import Item from './Item.svelte';

const coke = { 
  name: 'Coca-Cola',
  description: 'a carbonated beverage that will rot your teeth',
  nutrients: {
    calories: {
      name: 'Calories',
      quantity: '200',
      unit: 'kcal'
    },
    added_sugars: {
      name: 'Added Sugars',
      quantity: '300',
      unit: 'g'
    }
  }
};

describe('inventory items', () => {
  it('shows an item with title', () => {
    render(Item, { item: { name: 'Coca-Cola' } });
    expect(screen.queryByText('Coca-Cola')).toBeVisible();
  })
  it('shows actionable buttons on an item', () => {
    render(Item, { item: { name: 'Coca-Cola' } });

    const buttons = screen.queryAllByRole('button');
    const buttonTypes = buttons.map(button => button.textContent);

    expect(buttonTypes).toEqual([
      expect.stringContaining('➕'),
      expect.stringContaining('✏️'),
      expect.stringContaining('📑'),
      expect.stringContaining('🗑️')
    ])
  })
  it('shows several nutrients listed below name', () => {
    render(Item, { item: coke });

    expect(screen.getByText('Calories: 200kcal')).toBeVisible();
    expect(screen.getByText('Added Sugars: 300g')).toBeVisible();

  })
})
