import { camelCase } from '$utils/camelCase';

export const formatSource1 = async (id) => {
  return fetch(`https://redsky.target.com/redsky_aggregations/v1/web/pdp_client_v1?tcin=${id}&pricing_store_id=530&store_id=530&key=5d546952f5059b16db4aa90913e56d09d3ff2aa4`)
    .then(response => response.json())
    .then(json => {
      let nutrientsArr = json.data.product.item.enrichment.nutrition_facts.value_prepared_list[0].nutrients;
      const nutrientsObj = nutrientsArr.reduce(
        (resultObj, currentObj) => 
        ({ ...resultObj, [camelCase(currentObj.name)]: currentObj }),
        {}
      );
      return nutrientsObj;
    });
}

export const formatSource2 = (data) => {
  const nutrientsObj = Object.keys(data)
    .reduce((result, key) => {
      result[camelCase(key)] = data[key];
      if(Object.hasOwn(result[camelCase(key)], 'total_quantity')) {
        result[camelCase(key)].quantity = result[camelCase(key)].total_quantity;
        delete result[camelCase(key)].total_quantity;
      }
      return result;
    }, {});
  return nutrientsObj;
}
