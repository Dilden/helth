interface Nutrient {
	key: string; // snake_case
	name: string; // display name
	quantity: number | null;
	unit: 'g' | 'mg' | 'mcg' | 'kcal' | 'l' | 'ml';
	emoji?: string;
	countMax?: number;
}
