interface RecipeItem {
	id: number | string;
	servings: number;
}

interface Recipe {
	id?: number;
	name: string;
	description: string;
	items: RecipeItem[];
}
