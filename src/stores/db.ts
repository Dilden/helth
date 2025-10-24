import Dexie, { type EntityTable } from 'dexie';
import { thePast } from '$utils/dates';
import { list } from '$utils/nutrients';
import { migrate } from './dbmigrations';
import { dexieCloud } from 'dexie-cloud-addon';
import { PUBLIC_DB_URL } from '$env/static/public';
import { cloudMigrate } from '$stores/cloudmigrate';
import { initStores } from '$stores/stores.svelte';

export const db = new Dexie('helthdb', { addons: [dexieCloud] }) as Dexie & {
	inventory: EntityTable<InventoryItem, 'id'>;
	recipes: EntityTable<Recipe, 'id'>;
	settings: EntityTable<Setting, 'name'>;
	goals: EntityTable<Goal, 'name'>;
	limits: EntityTable<Limit, 'name'>;
	journal: EntityTable<JournalEntry, 'date'>;
	subscription: EntityTable<Subscription, 'subscriptionId'>;
};

migrate(db);

db.on('populate', async () => {
	db.on('ready', async () => {
		await initStores().then(
			async () =>
				await addDefaults()
					.then(() => console.log('adding defaults'))
					.catch(() => console.log('error adding defaults'))
		);
	});
});

db.cloud.configure({
	databaseUrl: PUBLIC_DB_URL,
	requireAuth: false,
	disableWebSocket: import.meta.env.VITEST == 'true' ? true : false
});

/*
 * Today
 */
export async function addDay(newDay: JournalEntry = defaultDay) {
	const aNewDay = {
		...newDay,
		date: newDay.date.toString().startsWith('#') ? newDay.date : '#' + newDay.date
	};
	return await db.journal.add(aNewDay).catch(() => console.log('unable to add day'));
}

export const updateDay = async (date: string, changes: Omit<JournalEntry, 'date'>) => {
	const day = await getDay(date);
	let result: number = 0;
	if (day) {
		// Need to override date prop so it contains '#' as first character.
		// changes obj does not have '#' as first char
		result = await db.journal.update(day.date, { ...day, ...changes, date: day.date });
	}
	return result;
};

// return the JournalEntry for a given date
// the date prop will be prefixed by a '#' char due to dexie cloud sync requirements
export const getDay = async (date: string | undefined) => {
	if (date && date.length > 0) {
		return await db.journal
			.where('date')
			.equals(date.startsWith('#') ? date : '#' + date)
			.first();
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
	return await db
		.table(tableName)
		.where('name')
		.equals(name.startsWith('#') ? name : '#' + name)
		.first();
}
export async function addItem(
	tableName: string,
	name: string,
	value: Limit['value'] | Goal['value'] | Setting['value']
) {
	return db
		.table(tableName)
		.add({
			name: name.startsWith('#') ? name : '#' + name,
			value: value
		})
		.catch('ConstraintError', (err) => {
			console.log(`error adding item to ${tableName}: ${err.message}`);
		});
}
export const updateItem = async (tableName: string, key: string, item: Setting | Goal | Limit) => {
	return db.table(tableName).update(key.startsWith('#') ? key : '#' + key, {
		...item,
		name: item.name.startsWith('#') ? item.name : '#' + item.name
	});
};

export const updateItems = async (tableName: string, items: readonly any[]) => {
	return db
		.table(tableName)
		.bulkPut(items.map((item) => ({ ...item, name: '#' + item.name })))
		.catch((error) => console.log(error));
};

export const getItems = async (tableName: string): Promise<NameValueStore> => {
	// spread all of the settings onto one object
	// so app doesn't need a store for each setting
	return db
		.table(tableName)
		.toArray()
		.then((data) =>
			data.reduce((prev, curr) => {
				const { name, ...value } = curr;
				return { ...prev, [name.substring(1)]: { name: name.substring(1), ...value } };
			}, [])
		);
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
	date: '#' + new Date().setHours(0, 0, 0, 0).toString()
};

// subscription logic
export const saveSubscription = async (subscription: Subscription) => {
	return await db.subscription.put({
		...subscription,
		subscriptionId: '#' + subscription.subscriptionId
	});
};
export const getSubscription = async () => {
	return await db.subscription.toArray().then((all) => all[0]); // only return one
};
export const removeSubscription = async (id: string) => {
	return await db.subscription.delete(id);
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
	await cloudMigrate(db);
	await db.journal
		.orderBy('date')
		.reverse()
		.first()
		.then(async (record) => {
			if (!record || thePast(record.date)) {
				await addDay();
			}
		});

	const setCount = await db.settings.toArray();
	const limitCount = await db.limits.toArray();
	if (setCount.length < 33 && limitCount.length < 33) {
		// settings, goals, limits defaults
		for (const { key } of list) {
			await db.settings
				.where('name')
				.equals(key)
				.first()
				.then(async (interval) => {
					!interval
						? await addItem('settings', key, settings[key]) // not found, add default setting
						: interval;
				})
				.catch((error) => console.log('error adding all the settings'));

			await db.goals
				.where('name')
				.equals(key)
				.first()
				.then(async (goal) => {
					!goal ? await addItem('goals', key, goals[key].value) : goal;
				});

			await db.limits
				.where('name')
				.equals(key)
				.first()
				.then(async (limit) => {
					!limit ? await addItem('limits', key, limits[key].value) : limit;
				});
		}
	}
};
