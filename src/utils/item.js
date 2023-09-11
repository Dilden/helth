export const nutrientsFromItem = (inventoryItem) => {
  const nutrients = Object.keys(inventoryItem.nutrients)
  .reduce((accum, name) => { 
    accum[name] = {};
    accum[name] = inventoryItem.nutrients[name].quantity;
    return accum;
  }, {});

  return nutrients;
}
