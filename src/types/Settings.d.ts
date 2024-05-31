interface Setting {
	name: string;
	value: {
		interval: number;
		enabled: boolean;
	};
}

interface Settings extends Array<Setting> {}
