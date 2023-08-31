import { describe, it, expect } from 'vitest';
import { formValues } from '$utils/formValues.js';

const sample = {
  elements: {
    0: {
      name: 'Albert',
      type: 'text',
      value: 'Testing Value'
    },
    1: {
      name: 'Bobert',
      type: 'text',
      value: 'Testing Value 2'
    },
    length: 2
  }
}

describe('form values', () => {
  it('returns an object of key:value pairs from the form values', async () => {
    const results = formValues(sample);
    expect(results).toEqual({ 
      'Albert': 'Testing Value',
      'Bobert': 'Testing Value 2' 
    })
  })
})
