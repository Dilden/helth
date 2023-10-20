import { it, expect } from 'vitest';
import { nutrientsFromItem, nutrientSumsFromList } from './item.js';

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

it('returns the sum of nutrients from a list of items', () => {
  const list = [
    {
      name: 'Coca-Cola',
      description: 'sweet nectar of the gods',
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
    },
    {
      name: 'Pepsi',
      description: 'a toxic waste spill sold to consumers in a can',
      nutrients: {
        calories: {
          name: 'Calories',
          quantity: '350',
          unit: 'kcal'
        },
        added_sugars: {
          name: 'Added Sugars',
          quantity: '50',
          unit: 'g'
        },
        sodium: {
          name: 'Sodium',
          quantity: '10',
          unit: 'mg'
        }
      }
    },
    {
      name: 'Mt. Dew',
      description: 'will actually kill you',
      nutrients: {
        calories: {
          name: 'Calories',
          quantity: '1000',
          unit: 'kcal'
        },
        added_sugars: {
          name: 'Added Sugars',
          quantity: '100',
          unit: 'g'
        },
        calcium: {
          name: 'Calcium',
          quantity: '1',
          unit: 'mg'
        }
      }
    }
  ];

  expect(nutrientSumsFromList(list)).toEqual(
    expect.objectContaining({
      added_sugars: 450,
      calories: 1550,
      calcium: 1,
      sodium: 10,
    }),
  )
})
