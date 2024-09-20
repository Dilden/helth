interface RecipeItem {
	id: number | string;
	servings: number;
}

interface Recipe {
	id?: string;
	name: string;
	description: string;
	items: RecipeItem[];
}
