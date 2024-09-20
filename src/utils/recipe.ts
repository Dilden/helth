import { getItemByIdFromTable } from '$stores/db';

export const lookupItems = (recipe: Recipe) => {
	return recipe.items.map(async (item: RecipeItem) => {
		return await getItemByIdFromTable('inventory', item.id);
	});
};
