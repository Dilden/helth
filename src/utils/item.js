export const nutrientsFromItem = (inventoryItem) => {
  const nutrients = Object.keys(inventoryItem.nutrients)
  .reduce((accum, name) => { 
    accum[name] = {};
    accum[name] = inventoryItem.nutrients[name].quantity;
    return accum;
  }, {});

  return nutrients;
}

export const nutrientSumsFromList = (itemList) => {
  const sums = itemList.map(nutrients => nutrientsFromItem(nutrients))
  .reduce((accum, current) => {
    Object.entries(current).map(( e ) => {
      accum[e[0]] = accum[e[0]] || 0;
      accum[e[0]] += Number( e[1] );
    });
    return accum;
  }, {});

  return sums;
}
