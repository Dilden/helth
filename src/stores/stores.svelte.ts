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
		await dbfun.addItem(tableName, item.name, item.value).catch((err) => console.log(err));
		await init();
	}
	async function update(key: string, item: Goal | Limit | Setting) {
		let value = await dbfun.findByName(key, tableName);
		await dbfun.updateItem(tableName, value.name, { ...value, ...item, name: value.name });
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

// unified search
export const q: Search = $state({ query: '' });
const r: Promise<SearchResults<InventoryItem | Recipe>> = $derived.by(async () => {
	// console.log({ results: [...inventory.get(), ...recipes.get()] });
	const queriedInventory = inventory
		.get()
		.filter(
			(item) =>
				item.name.toLowerCase().includes(q.query.toLowerCase()) ||
				item.description.toLowerCase().includes(q.query.toLowerCase())
		);

	const queriedRecipes = recipes
		.get()
		.filter(
			(recipe) =>
				recipe.name.toLowerCase().includes(q.query.toLowerCase()) ||
				recipe.description.toLowerCase().includes(q.query.toLowerCase())
		);

	const recipesWithItems = queriedRecipes.map(async (recipe: Recipe) => {
		const _items = lookupItems(recipe);
		const lookedUpItems = await Promise.all(_items);

		const items = lookedUpItems.map((item) => {
			let found = recipe.items.find((x) => x.id == item.id);

			// default servings to 1 if not set
			return { servings: 1, ...found, ...item };
		});

		return { ...recipe, items };
	});

	return { results: [...queriedInventory, ...(await Promise.all(recipesWithItems))] };
});
export const searchResults = () => r;

// today
function createTodayStore(): TodayStore<JournalEntry> {
	let workingDate: string = $state(new Date().setHours(0, 0, 0, 0).toString());
	let workingDay: JournalEntry = $state({ date: new Date().setHours(0, 0, 0, 0) });

	function get() {
		return { ...workingDay, date: Number(workingDay.date) };
	}
	async function init() {
		workingDay = await dbfun.getDay(workingDate).then(async (day) => {
			if (day) {
				return { ...day, date: day.date.toString().substring(1) };
			} else {
				// const { id, ...rest } = { ...dbfun.defaultDay, date: workingDate };
				await dbfun
					.addDay({ ...dbfun.defaultDay, date: workingDate })
					.catch((error) => console.log(error.message));
				return { ...dbfun.defaultDay, date: workingDate };
			}
		});
	}
	async function update(newVal: JournalEntry) {
		await dbfun.updateDay(newVal.date.toString(), { ...$state.snapshot(newVal) });
		await init();
	}
	async function setDate(date: string) {
		workingDate = date;
		await init();
	}
	function remove() { }
	async function add() { }

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

function createSubscriptionStore(): SubscriptionStore {
	let sub: Subscription = $state({
		subscriptionId: '',
		email: '',
		customerId: ''
	});

	function get() {
		return sub;
	}

	async function init() {
		sub = await dbfun.getSubscription();
	}
	async function add() {
		// 	await dbfun.saveSubscription(item);
		// 	await init();
	}
	async function update(id: string, item: Subscription) {
		await dbfun.saveSubscription({ ...item, subscriptionId: id });
		await init();
	}
	async function remove(id: string) {
		await dbfun.removeSubscription(id);
		await init();
	}

	return { init, add, update, remove, get };
}
export const subscription = createSubscriptionStore();

export const initStores = async () => {
	return await Promise.all([
		today.init(),
		history.init(),
		settings.init(),
		goals.init(),
		limits.init(),
		inventory.init(),
		recipes.init(),
		subscription.init()
	]);
};
