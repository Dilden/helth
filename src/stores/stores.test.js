import 'fake-indexeddb/auto';
import { describe, it, expect, beforeAll } from 'vitest';
import { recipes } from '$stores/stores.js';
import { dbopen } from '$stores/db.js';

describe('recipes stores', () => {
  beforeAll(async () => {
    await dbopen;
  })

  it('can set a value', async () => {
    await recipes.set({
      name: 'first recipe',
      description: 'its just a test, bro'
    });
    recipes.subscribe((value) => {
      expect(value).toContainEqual(
        expect.objectContaining({
          name: 'first recipe',
          description: 'its just a test, bro'
        })
      );
    })
  })
})
