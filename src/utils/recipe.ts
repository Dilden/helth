import { getItemByIdFromTable } from '$stores/db.js';

export const lookupItems = (recipe: Recipe) => {
  return recipe.items.map(async (item: RecipeItem) => {
     return await getItemByIdFromTable('inventory', item.id);
  });
}
