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
      const item = {
        barcode: json.data.product.item.primary_barcode,
        name: json.data.product.item.product_description.title,
        description: json.data.product.item.product_description.downstream_description,
        nutrients: nutrientsObj
      }
      return item;
    });
}

export const formatSource2 = (data) => {

  console.log(data.data);
  const nutrientsObj = Object.keys(data.data.product_details.nutrition_labels)
    .reduce((result, key) => {
      result[camelCase(key)] = data[key];
      if(Object.hasOwn(result[camelCase(key)], 'total_quantity')) {
        result[camelCase(key)].quantity = result[camelCase(key)].total_quantity;
        delete result[camelCase(key)].total_quantity;
      }
      return result;
    }, {});

  const item = {
    barcode: data.data.product_details.upc,
    name: data.data.product_details.brand_name + ' ' + data.data.product_details.product_name,
    description: data.data.product_details.product_description,
    nutrients: nutrientsObj
  }
  return item;
}
