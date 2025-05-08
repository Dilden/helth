import Dexie, { type EntityTable } from 'dexie';
import { thePast } from '$utils/dates';
import { list } from '$utils/nutrients';
import { migrate } from './dbmigrations';
import { dexieCloud } from 'dexie-cloud-addon';
import DB_DATA from '../../dexie-cloud.json';

// export const db = new Dexie('helthdb', { addons: [dexieCloud] });
export const db = new Dexie('helthdb', { addons: [dexieCloud] }) as Dexie & {
	inventory: EntityTable<InventoryItem, 'id'>;
	recipes: EntityTable<Recipe, 'id'>;
	settings: EntityTable<Setting, 'id'>;
	goals: EntityTable<Goal, 'id'>;
	limits: EntityTable<Limit, 'id'>;
	journal: EntityTable<JournalEntry, 'id'>;
};

migrate(db);

// db.on('populate', async () => await addDefaults());

db.cloud.configure({
	databaseUrl: DB_DATA.dbUrl,
	requireAuth: false
	// nameSuffix: false
});

export const dbopen = db.open().then(async () => {
	await addDefaults();
});

/*
 * Today
 */
export async function addDay(newDay: JournalEntry = defaultDay) {
	return await db.journal.add(newDay).catch((err) => console.log('error adding day'));
}

export const updateDay = async (date: number, changes: Omit<JournalEntry, 'date'>) => {
	const day = await getDay(date);
	let result: number = 0;
	if (day && day?.id) {
		result = await db.journal.update(day.id, { ...day, ...changes });
	}
	return result;
};

export const getDay = async (date: number | undefined) => {
	if (date) {
		return await db.journal.where('date').equals(date).first();
	} else {
		return false;
	}
};

export const getLatestDay = async () => {
	return await db.journal.orderBy('date').reverse().first();
};

export const getJournal = async () => {
	return await db.journal.toArray();
};

/*
 * Setting, Goals, Items
 */

// specify table name to put name/value pair there
export async function findByName(name: string, tableName: string) {
	return await db.table(tableName).where('name').equals(name).first();
}
export async function addItem(
	tableName: string,
	name: string,
	value: Limit['value'] | Goal['value'] | Setting['value']
) {
	await db
		.table(tableName)
		.add({
			name: name,
			value: value
		})
		.then()
		.catch('ConstraintError', (err) => {
			// console.log(`error adding item to ${tableName}: ${err.message}`);
			console.log(`Constraint Error: adding ${name}:${value} to ${tableName} violates constraints`);
		});
}
export const updateItem = async (tableName: string, key: string, item: Setting | Goal | Limit) => {
	return db.table(tableName).update(key, item);
};

export const updateItems = async (tableName: string, items: readonly any[]) => {
	return db.table(tableName).bulkPut(items);
};

export const getItems = async (tableName: string): Promise<NameValueStore> => {
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
export const getListItems = async (tableName: string) => {
	return await db.table(tableName).orderBy('created').toArray();
};

// if data.id or data.created is present, it will override the default values
// powerful for testing, but potentially dangerous
// DB should throw error if ID already exists
export const addToList = async <T>(tableName: string, data: T) => {
	const createdAt = new Date();
	return await db
		.table(tableName)
		.add({ id: crypto.randomUUID(), created: createdAt.getTime(), ...data });
};
export const updateItemInList = async (
	tableName: string,
	id: string,
	data: InventoryItem | Recipe | JournalEntry
) => {
	return await db.table(tableName).update(id, data);
};
export const deleteFromList = async (tableName: string, id: string) => {
	return await db.table(tableName).delete(id);
};
// delete the item from any Recipes first
export const deleteItemFromRecipes = async (id: string) => {
	return await getListItems('recipes').then((recipes) => {
		recipes.map(async (recipe) => {
			const itemMatches = recipe?.items?.filter((item: RecipeItem) => {
				if (item.id === id) {
					return item;
				}
			});
			if (itemMatches) {
				recipe.items = recipe?.items?.filter((x: RecipeItem) => !itemMatches.includes(x));
				return await updateItemInList('recipes', recipe.id, recipe);
			}
		});
	});
};
export const getInventory = async () => {
	return await getListItems('inventory');
};
export const addInventory = async (data: InventoryItem) => {
	return await addToList('inventory', data);
};
export const getItemByIdFromTable = async (tableName: string, id: string | number) => {
	return await db.table(tableName).where('id').equals(id).first();
};

// Persistent Storage https://dexie.org/docs/StorageManager
export const persist = async () => {
	return navigator.storage ? await navigator.storage.persist() : undefined;
};

export const isStoragePersisted = async () => {
	return await navigator.storage.persisted();
};

// default values
export const defaultDay: JournalEntry = {
	date: new Date().setHours(0, 0, 0, 0)
};

// create default settings + defaultDay values
const settings: Record<string, Setting['value']> = {};
const goals: Record<string, Goal> = {};
const limits: Record<string, Limit> = {};

list.forEach(({ key }, index) => {
	settings[key] = { interval: 5, enabled: true, position: index };
	goals[key] = { name: key, value: 0 };
	limits[key] = { name: key, value: 0 };

	if (key === 'water') {
		settings[key].interval = 500;
		goals[key] = { name: key, value: 2000 };
		limits[key] = { name: key, value: 3000 };
	} else if (key === 'calories') {
		settings[key].interval = 75;
		goals[key] = { name: key, value: 1600 };
		limits[key] = { name: key, value: 1800 };
	} else if (key === 'sodium') {
		settings[key].interval = 10;
		goals[key] = { name: key, value: 2200 };
		limits[key] = { name: key, value: 3000 };
	}

	defaultDay[key] = 0;
});

export const addDefaults = async () => {
	db.journal
		.orderBy('date')
		.reverse()
		.first()
		.then(async (record) => {
			if (!record || thePast(new Date(record.date))) {
				await addDay();
				// .then(() => console.log('default day added'))
				// .catch(() => console.log('error adding default day'));
			}
		});

	// settings, goals, limits defaults
	list.forEach(({ key }) => {
		db.settings
			.where('name')
			.equals(key)
			.first()
			.then(async (interval) => {
				!interval
					? await addItem('settings', key, settings[key]) // not found, add default setting
					: interval;
			});

		db.goals
			.where('name')
			.equals(key)
			.first()
			.then(async (goal) => {
				!goal ? await addItem('goals', key, goals[key].value) : goal;
			});

		db.limits
			.where('name')
			.equals(key)
			.first()
			.then(async (limit) => {
				!limit ? await addItem('limits', key, limits[key].value) : limit;
			});
	});
};
