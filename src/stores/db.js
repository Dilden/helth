import { Dexie } from 'dexie';
import { thePast } from '$utils/dates';
import { browser } from '$app/environment';

export const db = new Dexie('helthdb');

db.version(1).stores({
  journal: 'date, water, calories, protein, sodium',
  settings: '++id, &name, value', 
  limits: '++id, &name, value',
  goals: '++id, &name, value'
});

db.open().then((db) => {

  // check if today's date is most recent
  // add empty day if it is not
  db.journal.orderBy('date').reverse().first()
  .then(record => {
    if(!record || thePast(record.date)) {
      addDay();
    }
  });

  // TODO set defaults for:
  // + settings
  // + limits
  // + goals
  //db.settings
  //.where('name')
  //.equals('waterInterval')
  //  .first()
  //  .then((interval) => {
  //    !interval ? 500 : interval;
  //  });
});

export async function addDay() {
  try {
    const today = await db.journal.add({
      date: new Date().setHours(0, 0, 0, 0),
      water: 0,
      calories: 0,
      protein: 0,
      salt: 0
    });
    console.log(`added ${today}`);
  } catch (error) {
    console.log('error adding day');
  }
}

export const updateLatestDay = (date, changes) => {
  if(browser) {
    return db.journal.update(date, changes);
  }
  return {};
};

export const getLatestDay = () => {
  if(browser) {
    return db.journal.orderBy('date').reverse().first();
  }
  return {};
};
