import * as dbfun from '$stores/db';
import { writable, derived } from 'svelte/store';
import { lookupItems } from '$utils/recipe';

function createTodayStore() {
	const store = writable({});

	let workingDate = new Date().setHours(0, 0, 0, 0);
	let workingDay: Promise<JournalEntry | undefined> = dbfun.getDay(workingDate);
	return {
		...store,
		init: async () => {
			return workingDay.then((day) => {
				day ? store.set(day) : store.set({ ...dbfun.defaultDay, date: workingDate });
			});
		},
		set: async (newVal: JournalEntry) => {
			workingDay.then((day) => {
				if (day) {
					dbfun.updateDay(day.date, newVal);
				}
			});
			store.set(newVal);
		},
		setDate: async (date: number) => {
			workingDate = date;
			workingDay = dbfun.getDay(workingDate).then(async (day) => {
				if (!day) {
					dbfun.addDay({ ...dbfun.defaultDay, date: workingDate });
				}
				return dbfun.getDay(workingDate);
			});
		}
	};
}

function createHistoryStore() {
	const store = writable({});

	return {
		...store,
		init: async () => {
			const journal = dbfun.getJournal();
			journal.then((entries) => {
				entries ? store.set(entries) : store.set([]);
			});
			return journal;
		},
		set: async (newVal: JournalEntry[]) => {
			dbfun.updateItems('journal', newVal);
			store.set(newVal);
		}
	};
}

function createNameValueStore(tableName: string) {
	const store = writable({});

	return {
		...store,
		init: async () => {
			const items = dbfun.getItems(tableName);
			items.then((values) => {
				values.length != 0 ? store.set(values) : store.set('');
			});
			return items;
		},
		set: async (newVal: NameValueStore) => {
			dbfun.updateItems(
				tableName,
				Object.keys(newVal).map((key) => {
					return { name: key, value: newVal[key].value };
				})
			);
			store.set(newVal);
		}
	};
}

function createListStore(listName: string) {
	const store = writable({});

	return {
		...store,
		init: async () => {
			const items = dbfun.getListItems(listName);
			items.then((values) => {
				values ? store.set(values) : store.set([]);
			});
			return items;
		},
		set: async (newVal: InventoryItem | Recipe) => {
			if (newVal.id) {
				await dbfun.updateItemInList(listName, newVal.id, newVal);
			} else {
				await dbfun.addToList(listName, newVal);
			}
			store.set(await dbfun.getListItems(listName));
		},
		delete: async (id: string) => {
			if (listName === 'inventory') {
				await dbfun.deleteItemFromRecipes(id);
				// TODO:
				// recipes store needs to be re-initialized after this
			}
			await dbfun.deleteFromList(listName, id);
			store.set(await dbfun.getListItems(listName));
		}
	};
}

export const today = createTodayStore();
export const history = createHistoryStore();
export const settings = createNameValueStore('settings');
export const goals = createNameValueStore('goals');
export const limits = createNameValueStore('limits');
export const inventory = createListStore('inventory');
export const recipes = createListStore('recipes');

export const initStores = async () => {
	await today.init();
	await history.init();
	await settings.init();
	await goals.init();
	await limits.init();
	await inventory.init();
	await recipes.init();
};

// https://stackoverflow.com/a/65616230/759563
export const searchTerm = writable('');
export const filteredInventory = derived(
	[searchTerm, inventory],
	([$searchTerm, $inventory]) => {
		if (Array.isArray($inventory)) {
			return $inventory.filter(
				(item) =>
					item.name.toLowerCase().includes($searchTerm.toLowerCase()) ||
					item.description.toLowerCase().includes($searchTerm.toLowerCase())
			);
		}
		return $inventory;
	},
	inventory.init()
);

// returns a store array of promises
export const recipeSearch = writable('');
export const formattedRecipes = derived(
	[recipeSearch, recipes],
	([$recipeSearch, $recipes]) => {
		if (Array.isArray($recipes)) {
			let searched = $recipes;
			searched = $recipes.filter(
				(recipe) =>
					recipe.name.toLowerCase().includes($recipeSearch.toLowerCase()) ||
					recipe.description.toLowerCase().includes($recipeSearch.toLowerCase())
			);

			return searched.map(async (recipe: Recipe) => {
				const _items = lookupItems(recipe);
				const lookedUpItems = await Promise.all(_items);

				const items = lookedUpItems.map((item) => {
					let found = recipe.items.find((x) => x.id === item.id);

					// default servings to 1 if not set
					return { servings: 1, ...found, ...item };
				});

				return { ...recipe, items };
			});
		}
		return $recipes;
	},
	recipes.init()
);

export const inventoryFilter = writable('');
