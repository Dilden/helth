import { describe, it, expect } from 'vitest';
import { 
  formValues, 
  formatInventoryFormValues,
  formatRecipeFormValues
} from '$utils/formValues.js';

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
    5: {
      name: 'submit',
      type: 'submit',
      value: ''
    },
    length: 6
  }
}

const sampleRecipe = {
  elements: {
    0: {
      name: 'name',
      type: 'text',
      value: 'pizza'
    },
    1: {
      name: 'description',
      type: 'text',
      value: 'friday night is pizza night'
    },
    2: {
      name: 'cheese',
      type: 'checkbox',
      value: '34'
    },
    3: {
      name: 'sauce',
      type: 'checkbox',
      value: '2'
    },
    4: {
      name: 'crust',
      type: 'checkbox',
      value: '106'
    },
    5: {
      name: 'submit',
      type: 'submit',
      value: ''
    },
    length: 6
  }
}

describe('form values', () => {
  it('returns form input values except submit', () => {
    const results = formValues(sample);
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({name: 'name'}),
        expect.objectContaining({name: 'description'}),
        expect.objectContaining({name: 'added_sugars'}),
        expect.objectContaining({name: 'calories'}),
      ])
    );
  })
  it('returns an object of key:value pairs + nested nutrients object from the form values', async () => {
    const results = formatInventoryFormValues(sample);
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

  it('formats values from recipes form', () => {
    const results = formatRecipeFormValues(sampleRecipe);
    expect(results).toEqual({
      name: 'pizza',
      description: 'friday night is pizza night',
      items: [
        {id: 34},
        {id: 2},
        {id: 106}
      ]
    })
  })
})
