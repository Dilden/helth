interface Goal {
	name: string;
	value: number;
}

interface Limit {
	name: string;
	value: number;
}

interface Journal {
	date: number;
	[key: string]: number;
}

interface Setting {
	name: string;
	value: {
		interval: number;
		enabled: boolean;
	};
}

interface Settings extends Array<Setting> {}
