interface InventoryItem {
	id?: number;
	name: string;
	description: string;
	barcode: string | null; //barcode may have leading 0s, needs to be a string
	nutrients: Nutrient[];
	servings?: number;
}
