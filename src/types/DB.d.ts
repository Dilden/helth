interface Goal {
	name: string;
	value: number;
}

interface Limit {
	name: string;
	value: number;
}

interface JournalEntry {
	date: number;
	[key: string]: number;
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
