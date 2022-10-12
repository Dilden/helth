import { Dexie, liveQuery} from 'dexie';
import { browser } from '$app/environment';

export const db = new Dexie('helthdb');

db.version(1).stores({
  journal: '++id, $date, water, calories, protein, sodium',
  settings: '++id, date, water, calories, protein, sodium'
});

export async function addDay() {
  try {
    const today = await db.journal.add({
      date: new Date(),
      water: 1500,
      calories: Math.floor(Math.random() * 3500),
      protein: 15,
      salt: 1250
    });
    console.log(`added ${today}`);
  } catch (error) {
    console.log('error adding day');
  }
}

export const getToday = liveQuery(async () => {
  if(browser) {
    return db.journal.orderBy('date').reverse().first();
  }
  return {};
});
