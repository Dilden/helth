import { it, expect, vi } from 'vitest';
import { lookupItems, recipeWithItemList } from './recipe.js';

it.skip('add items to recipe', async () => {
  // const store = new Promise((resolve) => {
  //   resolve({
  //     foo: 'bar'
  //   })
  // })
  const recipe = {
    name: 'Will have full items listed',
    description: 'use with testing',
    items: [
      {id: 1},
      {id: 6}
    ]
  }
  const items = new Promise((resolve) => {
    resolve([
      {
        id: 1,
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
      },
      {
        id: 6,
        name: 'Pepsi',
        description: 'awful',
        nutrients: {
          calories: {
            name: 'Calories',
            quantity: '500',
            unit: 'kcal'
          },
          added_sugars: {
            name: 'Added Sugars',
            quantity: '400',
            unit: 'g'
          }
        }
      }
    ])
  });

  const resolved = await recipeWithItemList(recipe, items);
  expect(resolved).toEqual(expect.objectContaining({
    name: 'Will have full items listed',
    description: 'use with testing',
    items: [
      {
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
      },
      {
        name: 'Pepsi',
        description: 'awful',
        nutrients: {
          calories: {
            name: 'Calories',
            quantity: '500',
            unit: 'kcal'
          },
          added_sugars: {
            name: 'Added Sugars',
            quantity: '400',
            unit: 'g'
          }
        }
      }
    ]
  }));
})

it.skip('looks up items', async () => {
  vi.mock('src/stores/db.js');
  const recipe = {
    name: 'Will have full items listed',
    description: 'use with testing',
    items: [
      {id: 1},
      {id: 6}
    ]
  }
  expect( lookupItems(recipe) ).toHaveBeenCalled()
})
