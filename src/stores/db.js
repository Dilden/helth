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
      !interval ? addItem('settings', 'waterInterval', 500) : interval;
    });

  db.settings
  .where('name')
  .equals('calorieInterval')
    .first()
    .then((interval) => {
      !interval ? addItem('settings', 'calorieInterval', 75) : interval;
    });

  db.settings
  .where('name')
  .equals('sodiumInterval')
    .first()
    .then((interval) => {
      !interval ? addItem('settings', 'sodiumInterval', 10) : interval;
    });

  db.settings
  .where('name')
  .equals('proteinInterval')
    .first()
    .then((interval) => {
      !interval ? addItem('settings', 'proteinInterval', 5) : interval;
    });

  // goal defaults
  db.goals
  .where('name')
  .equals('water')
    .first()
    .then((waterGoal) => {
      !waterGoal ? addItem('goals', 'water', 2000) : waterGoal;
    });

  db.goals
  .where('name')
  .equals('protein')
    .first()
    .then((proteinGoal) => {
      !proteinGoal ? addItem('goals', 'protein', 50) : proteinGoal;
    });

  // limits
  db.limits
  .where('name')
  .equals('calories')
    .first()
    .then((calorieLimit) => {
      !calorieLimit ? addItem('limits', 'calories', 1800) : calorieLimit;
    });

  db.limits
  .where('name')
  .equals('sodium')
    .first()
    .then((sodiumLimit) => {
      !sodiumLimit ? addItem('limits', 'sodium', 3000) : sodiumLimit;
    });
});


// today
async function addDay() {
  try {
    const today = await db.journal.add({
      date: new Date().setHours(0, 0, 0, 0),
      water: 0,
      calories: 0,
      protein: 0,
      sodium: 0
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

export const getJournal = () => {
  if(browser) {
    return db.journal.toArray();
  }
  return {};
};

// settings, goals, items are all identical structurally
// they can use the same logic
// just specify a table name
async function addItem(tableName, name, value) {
  try {
    const item = await db.table(tableName).add({
      name: name,
      value: value
    });
    console.log(`added ${item}`);
  } catch (error) {
    console.log(`error adding item to ${tableName}: ${error}`);
  }
}

export const updateItems = (tableName, items) => {
  if(browser) {
    return db.table(tableName).bulkPut(items);
  }
  return {};
}

export const getItems = (tableName) => {
  // spread all of the settings onto one object
  // so app doesn't need a store for each setting
  if(browser) {
    return db.table(tableName).toArray()
    .then(data => data.reduce((prev, curr) => ({...prev, [curr.name]: curr}), []));
   
  }
  return {};
}
