interface Search {
	query: string;
}
interface SearchResults<T> {
	results: Array<T>;
}

interface Store {
	init(): Promise<void>;
	// add(item: T): Promise<void>;
	// update(id: string, newItem: T): Promise<void>;
	get(): Array<T>;
}
interface ListStore extends Store {
	add(item: T): Promise<void>;
	remove(id: string): Promise<void>;
	update(id: string, newItem: T): Promise<void>;
}

interface InventoryStore extends ListStore {
	get(): Array<InventoryItem>;
}
interface RecipeStore extends ListStore {
	get(): Array<Recipe>;
}

interface SettingStore extends Store {
	get(): Array<Setting>;
}
interface GoalStore extends Store {
	get(): Array<Goal>;
}
interface LimitStore extends Store {
	get(): Array<Limit>;
}

interface Goal {
	name: string;
	value: number;
}

interface Limit {
	name: string;
	value: number;
}

interface Setting {
	name: string;
	value: {
		interval: number;
		enabled: boolean;
		position: index;
	};
}

interface Settings extends Array<Setting> {}

interface NameValueStore {
	[key: string]: Goal | Limit | Setting;
}

interface JournalEntry {
	date: number;
	[key: string]: number;
}
