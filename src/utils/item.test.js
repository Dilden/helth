import { it, expect } from 'vitest';
import { nutrientsFromItem } from './item.js';

it('takes an inventory item and returns only the nutrients', () => {
  const inventoryItem = {
      name: 'Coca-Cola',
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
  expect(nutrientsFromItem(inventoryItem)).toEqual({
    calories: '200',
    added_sugars: '300'
  });
})
