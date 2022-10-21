import * as dbfun from '$stores/db';
import { writable } from 'svelte/store';

function createTodayStore() {

  const store = writable({});

  return {
    ...store,
    init: async () => {
      const latestDay = dbfun.getLatestDay();
      latestDay.then(day => {
        store.set(day);
      })
      return latestDay;
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

function createSettingsStore() {

  const store = writable({});

  return {
    ...store,
    init: async () => {
      const settings = dbfun.getSettings();
      settings.then(values => {
        store.set(values);
      })
      return settings;
    },
    set: async (newVal) => {
      dbfun.updateSettings(Object.keys(newVal).map((key) => {
        return {name: key, value: newVal[key].value}
      }));
      store.set(newVal);
    }
  }
}

export const today = createTodayStore();
export const settings = createSettingsStore();

