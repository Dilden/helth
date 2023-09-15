import { describe, it, expect } from 'vitest';
import { formValues } from '$utils/formValues.js';

const sample = {
  elements: {
    0: {
      name: 'name',
      type: 'text',
      value: 'New inventory item'
    },
    1: {
      name: 'description',
      type: 'text',
      value: 'Item description'
    },
    2: {
      name: '',
      type: 'fieldset'
    },
    3: {
      name: 'calories',
      type: 'text',
      value: '100'
    },
    4: {
      name: 'added_sugars',
      type: 'text',
      value: '10'
    },
    length: 5
  }
}

describe('form values', () => {
  it('returns an object of key:value pairs + nested nutrients object from the form values', async () => {
    const results = formValues(sample);
    expect(results).toEqual({ 
      'name': 'New inventory item',
      'description': 'Item description',
      'nutrients': {
        calories: {
          name: 'Calories',
          quantity: '100',
          unit: 'kcal'
        },
        added_sugars: {
          name: 'Added Sugars',
          quantity: '10',
          unit: 'g'
        }
      }
    })
  });
})
