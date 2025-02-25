import * as dbfun from '$stores/db';

function createListStore(tableName: 'inventory' | 'recipes') {
	let data: InventoryItem[] | Recipe[] = $state([]);

	function get() {
		return data;
	}

	async function init() {
		data = await dbfun.getListItems(tableName);
	}

	async function add(item: InventoryItem | Recipe) {
		await dbfun.addToList(tableName, item);
		await init();
	}

	async function remove(id: string) {
		await dbfun.deleteFromList(tableName, id);
		await init();
	}

	async function update(id: string, newItem: InventoryItem | Recipe) {
		await dbfun.updateItemInList(tableName, id, newItem);
		await init();
	}

	return { get, init, add, remove, update };
}

export const inventory = createListStore('inventory');
