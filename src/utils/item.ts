
export const nutrientSumsFromList = (itemList: InventoryItem[] ) => {
  const allNutrients = itemList.map(( item ) => item.nutrients).flat();

  const sums = allNutrients.reduce((accum, current: Nutrient) => {
    const found = accum.find((item: Nutrient) => item.key === current.key);

    if(found && found.quantity && current.quantity) {
      found.quantity += current.quantity;
    }
    else {
      accum.push(current);
    }
    return accum;
  }, [] as Nutrient[]);

  return sums;
}
