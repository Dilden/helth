import { it, expect } from 'vitest';
import { nutrientSumsFromList } from './item.js';

it('returns the sum of nutrients from a list of items', () => {
  const list: InventoryItem[] = [
    {
      name: 'Coca-Cola',
      description: 'sweet nectar of the gods',
      barcode: 9886,
      nutrients: [ 
        {
          name: 'Calories',
          quantity: 200,
          unit: 'kcal',
          key: 'calories'
        },
        {
          name: 'Added Sugars',
          quantity: 300,
          unit: 'g',
          key: 'added_sugars'
        }
      ]
    },
    {
      name: 'Pepsi',
      description: 'a toxic waste spill sold to consumers in a can',
      barcode: 9887,
      nutrients: [
        {
          key: 'calories',
          name: 'Calories',
          quantity: 350,
          unit: 'kcal'
        },
        {
          key: 'added_sugars',
          name: 'Added Sugars',
          quantity: 50,
          unit: 'g'
        },
        {
          key: 'sodium',
          name: 'Sodium',
          quantity: 10,
          unit: 'mg'
        }
      ]
    },
    {
      name: 'Mt. Dew',
      description: 'will actually kill you',
      barcode: 9888,
      nutrients: [ 
        {
          key: 'calories',
          name: 'Calories',
          quantity: 1000,
          unit: 'kcal'
        },
        {
          key: 'added_sugars',
          name: 'Added Sugars',
          quantity: 100,
          unit: 'g'
        },
        {
          key: 'calcium',
          name: 'Calcium',
          quantity: 1,
          unit: 'mg'
        }
      ]
    }
  ];

  expect(nutrientSumsFromList(list)).toEqual(
    expect.arrayContaining([
      {
        key: 'calories',
        name: 'Calories',
        quantity: 1550,
        unit: 'kcal'
      },
      {
        key: 'added_sugars',
        name: 'Added Sugars',
        quantity: 450,
        unit: 'g'
      },
      {
        key: 'calcium',
        name: 'Calcium',
        quantity: 1,
        unit: 'mg'
      },
      {
        key: 'sodium',
        name: 'Sodium',
        quantity: 10,
        unit: 'mg'
      }
    ]),
  )
})
