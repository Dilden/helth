import * as dbfun from '$stores/db';
import { lookupItems } from '$utils/recipe';

function createListStore(tableName: 'inventory'): InventoryStore;
function createListStore(tableName: 'recipes'): RecipeStore;
function createListStore(tableName: 'inventory' | 'recipes') {
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

function createNameValueStore(tableName: string): Store {
	let data = $state([]);

	function get() {
		return data;
	}

	async function init() {
		data = await dbfun.getItems(tableName);
	}
	async function add(item: NameValueStore) {
		await dbfun.addItem(
			tableName,
			Object.keys(item).map((key) => {
				return { name: key, value: item[key].value };
			})
		);
		await init();
	}
	// async function remove(tableName) {}
	async function update(item: NameValueStore) {
		await dbfun.updateItems(
			tableName,
			Object.keys(item).map((key) => {
				return { name: key, value: item[key].value };
			})
		);
		await init();
	}

	return { get, init, add, remove, update };
}

export const inventory = createListStore('inventory');
export const recipes = createListStore('recipes');

export const settings = createNameValueStore('settings');
export const goals = createNameValueStore('goals');
export const limits = createNameValueStore('limits');

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
