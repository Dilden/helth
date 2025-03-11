interface Search {
	query: string;
}
interface SearchResults<T> {
	results: Array<T>;
}

interface Store<T> {
	init(): Promise<void>;
	get(): Array<T>;
	add(item: T): Promise<void>;
	remove(id: string): Promise<void>;
	update(id: string, item: T): Promise<void>;
}
// interface ListStore<T> extends Store<T> {
// 	add(item: T): Promise<void>;
// 	remove(id: string): Promise<void>;
// 	update(id: string, item: T): Promise<void>;
// 	// get(): Array<T>;
// }

// interface InventoryStore extends ListStore {
// 	get(): Array<InventoryItem>;
// }
// interface RecipeStore extends ListStore {
// 	get(): Array<Recipe>;
// }

// interface NameValueStore<T> extends Store<T> {
// 	// get(): Array<T>;
// 	add(item: T): Promise<void>;
// 	update(key: string, item: T): Promise<void>;
// 	remove(key: string): Promise<void>;
// }
// interface SettingStore extends Store {
// 	get(): Array<Setting>;
// 	add(item: Setting): Promise<void>;
// 	update(key: string, item: Setting): Promise<void>;
// 	remove(key: string): Promise<void>;
// }
// interface GoalStore extends Store {
// 	get(): Array<Goal>;
// 	add(item: Goal): Promise<void>;
// 	update(key: string, item: Goal): Promise<void>;
// 	remove(key: string): Promise<void>;
// }
// interface LimitStore extends Store {
// 	get(): Array<Limit>;
// 	add(item: Limit): Promise<void>;
// 	update(key: string, item: Limit): Promise<void>;
// 	remove(key: string): Promise<void>;
// }

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

// interface NameValueStore {
// 	[key: string]: Goal | Limit | Setting;
// }

interface JournalEntry {
	date: number;
	[key: string]: number;
}
