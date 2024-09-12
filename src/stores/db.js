import { Dexie } from 'dexie';
// import { dexieCloud } from 'dexie-cloud-addon';
import { thePast } from '$utils/dates';
// import { PUBLIC_DB_URL } from '$env/static/public';
import { list } from '$utils/nutrients';
import { migrateInventoryIds, migrateRecipeItemIds } from './dbupgrade';

// export const db = new Dexie('helthdb', { addons: [dexieCloud] });
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
const goals = {};
const limits = {};
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

// Keep one settings object per nutrient
db.version(5)
	.stores({ settings: 'name, value' })
	.upgrade((data) => {
		return data
			.table('settings')
			.toCollection()
			.modify((option) => {
				option.name = option.name.replace('Interval', '');
				option.value = { interval: option.value, enabled: true };
			});
	});

db.version(6)
	.stores({ settings: 'name, value' })
	.upgrade((data) => {
		return data
			.table('settings')
			.toCollection()
			.modify((option) => {
				const pos = list.findIndex((nutrient) => option.name === nutrient.key);
				if (!option.value.position) {
					option.value.position = pos;
				}
			});
	});

// move data to temp tables to change PK
db.version(7)
	.stores({
		inventory: null,
		inventoryTemp: 'id, barcode, name, description',
		recipes: null,
		recipesTemp: 'id, name, description, items'
	})
	.upgrade(async (tx) => {
		const inv = await tx.table('inventory').toArray();
		const rec = await tx.table('recipes').toArray();

		await tx.table('inventoryTemp').bulkAdd(inv);
		await tx.table('recipesTemp').bulkAdd(rec);
	});

// drop temp tables allowing for new PK
// give each record a UID
db.version(8)
	.stores({
		inventoryTemp: null,
		inventory: '&id, barcode, name, description',
		recipesTemp: null,
		recipes: '&id, name, description, items'
	})
	.upgrade(async (tx) => {
		const inv = await tx.table('inventoryTemp').toArray();
		const rec = await tx.table('recipesTemp').toArray();

		await tx.table('inventory').bulkAdd(inv);
		await tx.table('recipes').bulkAdd(rec);

		await tx
			.table('inventory')
			.toCollection()
			.modify(async (record) => {
				record.uid = crypto.randomUUID();
			});
		await tx
			.table('recipes')
			.toCollection()
			.modify(async (record) => {
				record.uid = crypto.randomUUID();
			});
	});


// find all IDs from inventory
// set recipes.items[].id to inventory item.uid
// set recipes.id to uid
// set inventory.id to uid
db.version(9)
	.stores({
		inventory: '&id, barcode, name, description, created',
		recipes: '&id, name, description, items, created'
	})
	.upgrade(async (tx) => {

		const inv = await tx.table('inventory').toArray();
    inv.map(async ( item ) => {
      await tx
        .table('recipes')
        .toCollection()
        .modify((recipe) => {
          recipe.items = recipe.items.map((rItem) => {
            if (rItem.id === item.id ) {
              rItem.id = item.uid;
            }
            return item;
          });
        });
    })

    // set id = uid
    const createdAt = new Date();
		await tx
			.table('recipes')
			.toCollection()
			.modify(record => {
        record.created = createdAt.getTime() + record.id;
				record.id = record.uid;
        delete record.uid;
			});

		await tx
			.table('inventory')
			.toCollection()
			.modify(record => {
        record.created = createdAt.getTime() + record.id;
				record.id = record.uid;
        delete record.uid;
			});
	});

db.on('populate', async () => await addDefaults());

// db.cloud.configure({
// 	databaseUrl: PUBLIC_DB_URL,
// 	// requireAuth: true
// 	requireAuth: false,
// 	disableWebSocket: true
// });

export const dbopen = db.open().then(async () => {
	await addDefaults();
});

/*
 * Today
 */
export async function addDay(newDay = defaultDay) {
	try {
		await db.journal.add(newDay);
	} catch (error) {
		console.log('error adding day');
	}
}

export const updateDay = async (date, changes) => {
	return await db.journal.update(date, changes);
};

export const getDay = async (date) => {
	return await db.journal.get(date);
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
async function addItem(tableName, name, value) {
	try {
		await db.table(tableName).add({
			name: name,
			value: value
		});
	} catch (error) {
		console.log(`error adding item to ${tableName}: ${error.message}`);
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
	return await db.table(tableName).add({ id: crypto.randomUUID(), ...data });
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

export const addDefaults = async () => {
	db.journal
		.orderBy('date')
		.reverse()
		.first()
		.then(async (record) => {
			if (!record || thePast(record.date)) {
				await addDay();
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
