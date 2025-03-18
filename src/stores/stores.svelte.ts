import * as dbfun from '$stores/db';
import { lookupItems } from '$utils/recipe';

// inventory + recipes
function createListStore(tableName: 'inventory'): ListStore<InventoryItem>;
function createListStore(tableName: 'recipes'): ListStore<Recipe>;
function createListStore(tableName: 'inventory' | 'recipes'): ListStore<InventoryItem | Recipe> {
	let data: InventoryItem[] | Recipe[] = $state([]);

	function get() {
		return data;
	}

	async function init() {
		data = await dbfun.getListItems(tableName);
	}

	async function add(item: InventoryItem | Recipe) {
		await dbfun.addToList(tableName, $state.snapshot(item));
		await init();
	}

	async function remove(id: string) {
		if (tableName === 'inventory') {
			await dbfun.deleteItemFromRecipes(id);
		}
		await dbfun.deleteFromList(tableName, id);
		await init();
	}

	async function update(id: string, newItem: InventoryItem | Recipe) {
		await dbfun.updateItemInList(tableName, id, $state.snapshot(newItem));
		await init();
	}

	return { get, init, add, remove, update };
}

export const inventory = createListStore('inventory');
export const recipes = createListStore('recipes');

// goals, limits, settings
function createNameValueStore(tableName: 'goals'): NameValStore<Goal>;
function createNameValueStore(tableName: 'limits'): NameValStore<Limit>;
function createNameValueStore(tableName: 'settings'): NameValStore<Setting>;
function createNameValueStore(tableName: string): NameValStore<Goal | Limit | Setting> {
	let data: NameValueStore = $state({});

	function get() {
		return data;
	}

	async function init() {
		data = await dbfun.getItems(tableName);
	}
	async function add(item: Goal | Limit | Setting) {
		await dbfun.addItem(tableName, item.name, item.value);
		await init();
	}
	async function update(key: string, item: Goal | Limit | Setting) {
		await dbfun.updateItem(tableName, key, item);
		await init();
	}
	async function remove(key: string) {
		await dbfun.deleteFromList(tableName, key);
		await init();
	}

	return { get, init, add, update, remove };
}

export const goals = createNameValueStore('goals');
export const limits = createNameValueStore('limits');
export const settings = createNameValueStore('settings');

// inventory search
export const inventorySearch: Search = $state({ query: '' });
const invS: SearchResults<InventoryItem> = $derived.by(() => {
	return {
		results: inventory
			.get()
			.filter(
				(item) =>
					item.name.toLowerCase().includes(inventorySearch.query.toLowerCase()) ||
					item.description.toLowerCase().includes(inventorySearch.query.toLowerCase())
			)
	};
});
export const inventorySearchResults = () => invS;

// recipe search
export const recipesInventoryFilter: Search = $state({ query: '' });
export const recipeSearch: Search = $state({ query: '' });
const recS: SearchResults<Promise<Recipe>> = $derived.by(() => {
	let searched = recipes
		.get()
		.filter(
			(recipe) =>
				recipe.name.toLowerCase().includes(recipeSearch.query.toLowerCase()) ||
				recipe.description.toLowerCase().includes(recipeSearch.query.toLowerCase())
		);

	return {
		results: searched.map(async (recipe: Recipe) => {
			const _items = lookupItems(recipe);
			const lookedUpItems = await Promise.all(_items);

			const items = lookedUpItems.map((item) => {
				let found = recipe.items.find((x) => x.id === item.id);

				// default servings to 1 if not set
				return { servings: 1, ...found, ...item };
			});

			return { ...recipe, items };
		})
	};
});
export const recipeSearchResults = () => recS;

// today
function createTodayStore(): TodayStore<JournalEntry> {
	let workingDate = $state(new Date().setHours(0, 0, 0, 0));
	let workingDay: JournalEntry = $state({ date: workingDate });

	function get() {
		return workingDay;
	}
	async function init() {
		workingDay = await dbfun.getDay(workingDate).then(async (day) => {
			if (day) {
				return day;
			} else {
				await dbfun.addDay({ ...dbfun.defaultDay, date: workingDate });
				return { ...dbfun.defaultDay, date: workingDate };
			}
		});
	}
	async function update(newVal: JournalEntry) {
		await dbfun.updateDay(newVal.date, $state.snapshot(newVal));
		await init();
	}
	async function setDate(date: number) {
		workingDate = date;
		await init();
	}
	function remove() {}
	async function add() {}

	return { init, add, update, get, setDate, remove };
}
export const today = createTodayStore();

// history
function createHistoryStore(): HistoryStore {
	let history: JournalEntry[] = $state([]);

	function get() {
		return history;
	}

	async function init() {
		history = await dbfun.getJournal();
	}
	async function add(val: JournalEntry) {
		await dbfun.addDay(val);
		init();
	}
	async function update(id: string, newVal: JournalEntry) {
		await dbfun.updateItemInList('journal', id, $state.snapshot(newVal));
		init();
	}
	async function remove(id: string) {
		await dbfun.deleteFromList('journal', id);
		await init();
	}

	return { init, add, update, remove, get };
}
export const history = createHistoryStore();
