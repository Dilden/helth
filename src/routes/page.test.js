import { describe, it, expect } from 'vitest';
import { load } from './+page.js';

describe('inventory', () => {
  it('it loads inventory data', () => {
    const result = load();
    expect(result.inventory).toEqual([
      {title: 'Coca-Cola'},
      {title: 'Pepsi'},
      {title: 'Monster'}
    ]);
  })
})
