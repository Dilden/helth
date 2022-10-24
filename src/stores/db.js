import { Dexie } from 'dexie';
import { thePast } from '$utils/dates';
import { browser } from '$app/environment';

export const db = new Dexie('helthdb');

db.version(1).stores({
  journal: 'date, water, calories, protein, sodium',
  settings: 'name, value', 
  limits: 'name, value',
  goals: 'name, value'
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

  // settings defaults
  db.settings
  .where('name')
  .equals('waterInterval')
    .first()
    .then((interval) => {
      !interval ? addSetting('waterInterval', 500) : interval;
    });

  db.settings
  .where('name')
  .equals('calorieInterval')
    .first()
    .then((interval) => {
      !interval ? addSetting('calorieInterval', 75) : interval;
    });

  db.settings
  .where('name')
  .equals('sodiumInterval')
    .first()
    .then((interval) => {
      !interval ? addSetting('sodiumInterval', 10) : interval;
    });

  db.settings
  .where('name')
  .equals('proteinInterval')
    .first()
    .then((interval) => {
      !interval ? addSetting('proteinInterval', 5) : interval;
    });

  // goal defaults
  db.goals
  .where('name')
  .equals('water')
    .first()
    .then((waterGoal) => {
      !waterGoal ? addGoal('water', 2000) : waterGoal;
    });

  db.goals
  .where('name')
  .equals('protein')
    .first()
    .then((proteinGoal) => {
      !proteinGoal ? addGoal('water', 50) : proteinGoal;
    });

  // TODO set defaults for:
  // + limits
});


// today
async function addDay() {
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

// settings
async function addSetting(name, value) {
  try {
    const setting = await db.settings.add({
      name: name,
      value: value
    });
    console.log(`added ${setting}`);
  } catch (error) {
    console.log('error adding setting');
  }
}

export const updateSettings = (items) => {
  if(browser) {
    return db.settings.bulkPut(items);
  }
  return {};
}

export const getSettings = () => {
  // spread all of the settings onto one object
  // so app doesn't need a store for each setting
  if(browser) {
    return db.settings.toArray()
    .then(data => data.reduce((prev, curr) => ({...prev, [curr.name]: curr}), []));
   
  }
  return {};
}

// goals
async function addGoal(name, value) {
  try {
    const goal = await db.goals.add({
      name: name,
      value: value
    });
    console.log(`added ${goal}`);
  } catch (error) {
    console.log('error adding goal');
  }
}

export const updateGoals = (items) => {
  if(browser) {
    return db.goals.bulkPut(items);
  }
  return {};
}

export const getGoals = () => {
  // spread all of the settings onto one object
  // so app doesn't need a store for each setting
  if(browser) {
    return db.goals.toArray()
    .then(data => data.reduce((prev, curr) => ({...prev, [curr.name]: curr}), []));
   
  }
  return {};
}
