import { snake_case } from '$utils/naming.js';
import { list } from '$utils/nutrients.js'

export const formatSource2 = (data) => {

  const nutrientsObj = Object.entries(data.data.product_details.nutrition_labels)
    .reduce((accum, key) => {
      let nutrientName = snake_case(key[0]);
      switch(nutrientName) {
        case 'fat':
          nutrientName = 'total_fat';
          break;
      }

      accum[nutrientName] = accum[nutrientName] || {};
      accum[nutrientName].unit = ( key[1].uom ? key[1].uom : list[nutrientName].unit );
      accum[nutrientName].name = ( list[nutrientName].name );
      accum[nutrientName].quantity = ( key[1].total_quantity ? String(key[1].total_quantity) : '0' );
      
      return accum;
    }, {});

  const item = {
    barcode: data.data.product_details.upc,
    name: data.data.product_details.brand_name + ' ' + data.data.product_details.product_name,
    description: data.data.product_details.product_description,
    nutrients: nutrientsObj
  }
  return item;
}
