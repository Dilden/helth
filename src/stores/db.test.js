import 'fake-indexeddb/auto';
import { IDBFactory } from 'fake-indexeddb';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { dbopen, getListItems, addToList } from '$stores/db.js';
import { updateItemInList } from './db';

beforeAll(async () => await dbopen);
afterAll(() => {
  indexedDB = new IDBFactory();
});

describe('list tables', () => {
  it('adds an item to a list', async () => {
    await addToList('recipes', {name: 'test', description: 'desc'});
    expect(await getListItems('recipes')).toContainEqual(
      expect.objectContaining({name: 'test', description: 'desc'})
    );
  })

  it('can update an item in the list', async () => {
    await addToList('recipes', {id: 2, name: 'number 2', description: 'another thing'});
    await updateItemInList('recipes', 2, {name: 'numero dos'});
    expect(await getListItems('recipes')).toContainEqual(
      expect.objectContaining({name: 'numero dos', description: 'another thing'})
    );
  })

})
