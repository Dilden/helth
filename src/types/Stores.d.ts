interface Search {
	query: string;
}
interface SearchResults<T> {
	results: Array<T>;
}

interface Store<T> {
	init(): Promise<void>;
	add(item: T): Promise<void>;
	update(id: string, item: T): Promise<void>;
	remove(id: string): Promise<void>;
}

interface ListStore<T> extends Store<T> {
	get(): Array<T>;
}

interface NameValStore<T> extends Store<T> {
	get(): {
		[key: string]: T;
	};
}

interface TodayStore<JournalEntry> extends Store<JournalEntry> {
	get(): JournalEntry;
	setDate(date: number): Promise<void>;
	update(val: JournalEntry);
	remove(): void;
}

interface HistoryStore extends Store<JournalEntry> {
	get(): JournalEntry[];
	update(id: string, val: JournalEntry): Promise<void>;
	remove(id: string): Promise<void>;
	add(val: JournalEntry): Promise<void>;
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
