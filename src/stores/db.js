import { Dexie } from 'dexie';
import { thePast } from '$utils/dates';
import { list } from '$utils/nutrients';

export const db = new Dexie('helthdb');

// default values
export const defaultDay = {
	date: new Date().setHours(0, 0, 0, 0)
	// water: 0,
	// calories: 0,
	// protein: 0,
	// sodium: 0
};

// create default settings + defaultDay values
const settings = {};
list.forEach(({ key }) => {
	settings[key + 'Interval'] = { name: key + 'Interval', value: 5 };

	if (key === 'water') {
		settings[key + 'Interval'] = { name: key + 'Interval', value: 500 };
	} else if (key === 'calories') {
		settings[key + 'Interval'] = { name: key + 'Interval', value: 75 };
	} else if (key === 'sodium') {
		settings[key + 'Interval'] = { name: key + 'Interval', value: 10 };
	}

	defaultDay[key] = 0;
});

export const goals = {
	water: {
		value: 2000,
		name: 'water'
	},
	protein: {
		value: 50,
		name: 'protein'
	}
};
export const limits = {
	calories: {
		value: 1800,
		name: 'calories'
	},
	sodium: {
		value: 3000,
		name: 'sodium'
	}
};

db.version(1).stores({
	journal: 'date, water, calories, protein, sodium',
	settings: 'name, value',
	limits: 'name, value',
	goals: 'name, value'
});

db.version(2).stores({
	inventory: '++id, &barcode, name, description, nutrients'
});
db.version(3).stores({
	recipes: '++id, name, description, items'
});

// https://dexie.org/docs/Tutorial/Design#database-versioning
// Old
db.version(4)
	.stores({ inventory: '++id, &barcode, name, description' })
	.upgrade((data) => {
		return data
			.table('inventory')
			.toCollection()
			.modify((item) => {
				const asArray = Object.entries(item.nutrients).map(([index, value]) => {
					const obj = { ...value };
					obj.key = index;
					obj.quantity = Number(obj.quantity);
					return obj;
				});
				item.nutrients = asArray;
			});
	});

export const dbopen = db.open().then(() => {
	// check if today's date is most recent
	// add empty day if it is not
	addDefaults();
});

/*
 * Today
 */
async function addDay() {
	try {
		const today = await db.journal.add(defaultDay);
	} catch (error) {
		// console.log('error adding day');
	}
}

export const updateLatestDay = async (date, changes) => {
	return db.journal.update(date, changes);
};

export const getLatestDay = async () => {
	return db.journal.orderBy('date').reverse().first();
};

export const getJournal = async () => {
	return db.journal.toArray();
};

/*
 * Setting, Goals, Items
 */

// specify table name to put name/value pair there
async function addItem(tableName, name, value) {
	try {
		await db.table(tableName).add({
			name: name,
			value: value
		});
	} catch (error) {
		// console.log(`error adding item to ${tableName}: ${error}`);
	}
}

export const updateItems = async (tableName, items) => {
	return db.table(tableName).bulkPut(items);
};

export const getItems = async (tableName) => {
	// spread all of the settings onto one object
	// so app doesn't need a store for each setting
	return db
		.table(tableName)
		.toArray()
		.then((data) => data.reduce((prev, curr) => ({ ...prev, [curr.name]: curr }), []));
};

/*
 * List store methods
 * Inventory, Recipes
 */
export const getListItems = async (tableName) => {
	return await db.table(tableName).toArray();
};
export const addToList = async (tableName, data) => {
	return await db.table(tableName).add(data);
};
export const updateItemInList = async (tableName, id, data) => {
	return await db.table(tableName).update(id, data);
};
export const deleteFromList = async (tableName, id) => {
	return await db.table(tableName).delete(id);
};
// delete the item from any Recipes first
export const deleteItemFromRecipes = async (id) => {
	return await getListItems('recipes').then((recipes) => {
		recipes.map(async (recipe) => {
			const itemMatches = recipe?.items?.filter((item) => {
				if (item.id === id) {
					return item;
				}
			});
			if (itemMatches) {
				recipe.items = recipe?.items?.filter((x) => !itemMatches.includes(x));
				return await updateItemInList('recipes', recipe.id, recipe);
			}
		});
	});
};
export const getInventory = async () => {
	return await getListItems('inventory');
};
export const addInventory = async (data) => {
	return await addToList('inventory', data);
};
export const getItemByIdFromTable = async (tableName, id) => {
	return await db.table(tableName).where('id').equals(id).first();
};

// Persistent Storage https://dexie.org/docs/StorageManager
export const persist = async () => {
	return navigator.storage ? await navigator.storage.persist() : undefined;
};

export const isStoragePersisted = async () => {
	return await navigator.storage.persisted();
};

export const addDefaults = () => {
	db.journal
		.orderBy('date')
		.reverse()
		.first()
		.then((record) => {
			if (!record || thePast(record.date)) {
				addDay();
			}
		});

	// settings defaults
	list.forEach(({ key }) => {
		db.settings
			.where('name')
			.equals(key + 'Interval')
			.first()
			.then((interval) => {
				!interval
					? addItem('settings', key + 'Interval', settings[key + 'Interval'].value) // not found, add default setting
					: interval;
			});
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
};
