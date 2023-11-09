import { getItemByIdFromTable } from '$stores/db.js';

export const lookupItems = (recipe) => {
  return recipe.items.map(async (item) => {
     return await getItemByIdFromTable('inventory', item.id);
  });
}
