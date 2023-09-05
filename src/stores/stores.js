import * as dbfun from '$stores/db';
import { writable } from 'svelte/store';

function createTodayStore() {

  const store = writable({});

  return {
    ...store,
    init: async () => {
      return dbfun.getLatestDay()
        .then(day => {
          (day) ? store.set(day) : store.set(dbfun.defaultDay);
        });
    },
    set: async (newVal) => {
      dbfun.getLatestDay()
        .then(day => {
          dbfun.updateLatestDay(day.date, newVal);
        });
      store.set(newVal);
    }
  }
}

function createHistoryStore() {

  const store = writable({});

  return {
    ...store,
    init: async () => {
      const journal = dbfun.getJournal();
      journal.then(entries => {
        (entries) ? store.set(entries) : store.set([]);
      })
      return journal;
    },
    set: async (newVal) => {
      dbfun.updateItems('journal', newVal);
      store.set(newVal);
    }
  }
}

function createNameValueStore(tableName) {
  const store = writable({});

  return {
    ...store,
    init: async () => {
      const items = dbfun.getItems(tableName);
      items.then(values => {
        (values.length != 0) ? store.set(values) : store.set(dbfun[tableName]);
      })
      return items;
    },
    set: async (newVal) => {
      dbfun.updateItems(tableName, Object.keys(newVal).map((key) => {
        return {name: key, value: newVal[key].value}
      }));
      store.set(newVal);
    }
  }
}

function createInventoryStore() {
  const store = writable({});

  return {
    ...store,
    init: async () => {
      const items = dbfun.getInventory();
      items.then(values => {
        (values) ? store.set(values) : store.set([]);
      })
      return items;
    },
    set: async (newVal) => {
      dbfun.addInventory(newVal);
      store.set(await dbfun.getInventory());
    }
  }
}

export const today = createTodayStore();
export const history = createHistoryStore();
export const settings = createNameValueStore('settings');
export const goals = createNameValueStore('goals');
export const limits = createNameValueStore('limits');
export const inventory = createInventoryStore();

