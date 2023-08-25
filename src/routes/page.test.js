import { describe, it, expect, vi } from 'vitest';

const loadSampleData = () => ({
  inventory: [
    { title: 'Coca-Cola' },
    { title: 'Pepsi' },
    { title: 'Monster' },
  ]
});

describe('inventory', () => {
  const load = vi.fn();
  load.mockResolvedValue(loadSampleData());

  it('it loads inventory data', async () => {
    const result = await load();
    expect(result.inventory).toEqual([
      {title: 'Coca-Cola'},
      {title: 'Pepsi'},
      {title: 'Monster'}
    ]);
  })
})
