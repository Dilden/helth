import 'fake-indexeddb/auto';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import AddItem from './AddItem.svelte';


describe('add item to inventory form', () => {
  it('populates the form when provided an item', () => {
    const coke = { 
      name: 'Coca-Cola',
      description: 'tasty carbonated drink',
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
    }
    render(AddItem, {item: coke});

    expect(screen.queryByLabelText('Name')).toHaveValue('Coca-Cola');
    expect(screen.queryByLabelText('Barcode')).toHaveValue('');
  });
})


