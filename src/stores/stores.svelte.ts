import * as dbfun from '$stores/db';

function createListStore(tableName: string) {
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

	return { get, init, add, remove };
}

export const inventory = createListStore('inventory' as const);
