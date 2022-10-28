import { Dexie } from 'dexie';
import { thePast } from '$utils/dates';
import { browser } from '$app/environment';

export const db = new Dexie('helthdb');

// default values
export const defaultDay = {
  date: new Date().setHours(0, 0, 0, 0),
  water: 0,
  calories: 0,
  protein: 0,
  sodium: 0
}
export const settings = {
  waterInterval: {
    name: 'waterInterval',
    value: 500
  },
  calorieInterval: { 
    value: 75,
    name: 'calorieInterval'
  },
  sodiumInterval: { 
    value: 10,
    name: 'sodiumInterval'
  },
  proteinInterval: { 
    value: 5,
    name: 'proteinInterval'
  },
}
export const goals = {
  water: { 
    value: 2000,
    name: 'water'
  },
  protein: {
    value: 50,
    name: 'protein'
  },
}
export const limits = {
  calories: {
    value: 1800,
    name: 'calories'
  },
  sodium: {
    value: 3000,
    name: 'sodium'
  },
}

db.version(1).stores({
  journal: 'date, water, calories, protein, sodium',
  settings: 'name, value', 
  limits: 'name, value',
  goals: 'name, value'
});

db.on('ready', function(db) {
  // check if today's date is most recent
  // add empty day if it is not

  return db.limits.count((count) => {
    if(count <= 0) {
      console.log('limits table is empty...');

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
          !interval ? addItem('settings', 'waterInterval', settings.waterInterval.value) : interval;
        });

      db.settings
      .where('name')
      .equals('calorieInterval')
        .first()
        .then((interval) => {
          !interval ? addItem('settings', 'calorieInterval', settings.calorieInterval.value) : interval;
        });

      db.settings
      .where('name')
      .equals('sodiumInterval')
        .first()
        .then((interval) => {
          !interval ? addItem('settings', 'sodiumInterval', settings.sodiumInterval.value) : interval;
        });

      db.settings
      .where('name')
      .equals('proteinInterval')
        .first()
        .then((interval) => {
          !interval ? addItem('settings', 'proteinInterval', settings.proteinInterval.value) : interval;
        });

      // goal defaults
      db.goals
      .where('name')
      .equals('water')
        .first()
        .then((waterGoal) => {
          !waterGoal ? addItem('goals', 'water', goals.water.value) : waterGoal;
        });

      db.goals
      .where('name')
      .equals('protein')
        .first()
        .then((proteinGoal) => {
          !proteinGoal ? addItem('goals', 'protein', goals.protein.value) : proteinGoal;
        });

      // limits
      db.limits
      .where('name')
      .equals('calories')
        .first()
        .then((calorieLimit) => {
          !calorieLimit ? addItem('limits', 'calories', limits.calories.value) : calorieLimit;
        });

      db.limits
      .where('name')
      .equals('sodium')
        .first()
        .then((sodiumLimit) => {
          !sodiumLimit ? addItem('limits', 'sodium', limits.sodium.value) : sodiumLimit;
        });
    }
  })
});


// today
async function addDay() {
  try {
    const today = await db.journal.add(defaultDay);
    console.log(`added ${today}`);
  } catch (error) {
    console.log('error adding day');
  }
}

export const updateLatestDay = async (date, changes) => {
  if(browser) {
    return db.journal.update(date, changes);
  }
  return {};
};

export const getLatestDay = async () => {
  if(browser) {
    return db.journal.orderBy('date').reverse().first();
  }
  return {};
};

export const getJournal = async () => {
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

export const updateItems = async (tableName, items) => {
  if(browser) {
    return db.table(tableName).bulkPut(items);
  }
  return {};
}

export const getItems = async (tableName) => {
  // spread all of the settings onto one object
  // so app doesn't need a store for each setting
  if(browser) {
    return db.table(tableName).toArray()
    .then(data => data.reduce((prev, curr) => ({...prev, [curr.name]: curr}), []));
   
  }
  return {};
}
