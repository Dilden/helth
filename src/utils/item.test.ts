import { it, expect } from 'vitest';
import { nutrientSumsFromList, applyServings } from './item.js';



it('returns the sum of nutrients from a list of items', () => {
  expect(nutrientSumsFromList(list1)).toEqual(
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
        key: 'sodium',
        name: 'Sodium',
        quantity: 10,
        unit: 'mg'
      },
      {
        key: 'calcium',
        name: 'Calcium',
        quantity: 1,
        unit: 'mg'
      }
    ]),
  )
})
it('returns the items with servings applied to nutrients', () => {
  expect(applyServings(list2)).toEqual(
    expect.arrayContaining([
      {
        name: 'Coca-Cola',
        description: 'sweet nectar of the gods',
        barcode: '9886',
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
        ],
        servings: 1
      },
      {
        name: 'Pepsi',
        description: 'a toxic waste spill sold to consumers in a can',
        barcode: '9887',
        nutrients: [
          {
            key: 'calories',
            name: 'Calories',
            quantity: 700,
            unit: 'kcal'
          },
          {
            key: 'added_sugars',
            name: 'Added Sugars',
            quantity: 100,
            unit: 'g'
          },
          {
            key: 'sodium',
            name: 'Sodium',
            quantity: 20,
            unit: 'mg'
          }
        ],
        servings: 2
      },
      {
        name: 'Mt. Dew',
        description: 'will actually kill you',
        barcode: '9888',
        nutrients: [ 
          {
            key: 'calories',
            name: 'Calories',
            quantity: 500,
            unit: 'kcal'
          },
          {
            key: 'added_sugars',
            name: 'Added Sugars',
            quantity: 50,
            unit: 'g'
          },
          {
            key: 'calcium',
            name: 'Calcium',
            quantity: .5,
            unit: 'mg'
          }
        ],
        servings: .5
      }
    ])
  );
})


// list1 and list2 are identical but the methods being tested are mutating the objects
const list1: InventoryItem[] = [
  {
    name: 'Coca-Cola',
    description: 'sweet nectar of the gods',
    barcode: '9886',
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
    ],
    servings: 1
  },
  {
    name: 'Pepsi',
    description: 'a toxic waste spill sold to consumers in a can',
    barcode: '9887',
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
    ],
    servings: 2
  },
  {
    name: 'Mt. Dew',
    description: 'will actually kill you',
    barcode: '9888',
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
    ],
    servings: .5
  }
];


const list2: InventoryItem[] = [
  {
    name: 'Coca-Cola',
    description: 'sweet nectar of the gods',
    barcode: '9886',
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
    ],
    servings: 1
  },
  {
    name: 'Pepsi',
    description: 'a toxic waste spill sold to consumers in a can',
    barcode: '9887',
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
    ],
    servings: 2
  },
  {
    name: 'Mt. Dew',
    description: 'will actually kill you',
    barcode: '9888',
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
    ],
    servings: .5
  }
];
