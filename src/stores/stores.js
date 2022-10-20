import { getLatestDay, updateLatestDay } from '$stores/db';
import { writable } from 'svelte/store';

function createTodayStore() {

  const store = writable({});

  return {
    ...store,
    init: async () => {
      const latestDay = getLatestDay();
      latestDay.then(day => {
        store.set(day);
      })
      return latestDay;
    },
    set: async (newVal) => {
      getLatestDay()
        .then(day => {
          updateLatestDay(day.date, newVal);
        });
      store.set(newVal);
    }
  }
}

export const today = createTodayStore();

