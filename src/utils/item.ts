
export const nutrientSumsFromList = (itemList: InventoryItem[] ) => {
  const allNutrients = itemList.map(( item ) => item.nutrients).flat();

  const sums = allNutrients.reduce((accum, current: Nutrient) => {

    const foundIndex = accum.findIndex(({key}) => key === current.key);

    if(accum && accum[foundIndex]) {
      accum[foundIndex].quantity = Number( accum[foundIndex].quantity ) + Number( current.quantity );
    }
    else {
      accum.push(current);
    }
    return accum;
  }, [] as Nutrient[]);

  return sums;
}
