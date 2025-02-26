interface ListStore {
	init(): Promise<void>;
	add(item: T): Promise<void>;
	remove(id: string): Promise<void>;
	update(id: string, newItem: T): Promise<void>;
	get(): Array<T>;
}
interface InventoryStore extends ListStore {
	get(): Array<InventoryItem>;
}
interface RecipeStore extends ListStore {
	get(): Array<Recipe>;
}

interface Search<T> {
	query: string;
	results: Array<T>;
}
