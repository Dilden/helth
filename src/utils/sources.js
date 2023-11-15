import { snake_case } from '$utils/naming.js';
import { list } from '$utils/nutrients.js';
import { error } from '@sveltejs/kit';

const openFoodFacts = (code) => {
  // // staging data
  return `https://world.openfoodfacts.net/api/v2/product/${code}.json?fields=product_name,nutriments,ingredients_text`
  // // production data
  // return `https://world.openfoodfacts.org/api/v2/product/${code}.json`
}

const formatOpenFood = (data) => {
  const formatted = {};
  formatted.name = data.product.product_name;
  formatted.description = data.product.ingredients_text;
  formatted.barcode = data.code;

  formatted.nutrients = Object.entries( list ).reduce((accum, [key, value]) => {

    let nutrimentKey = '';
    // Open Food Facts tracks nutrients using different names than we do
    switch(key.replace("_", "-")) {
      case 'calories':
        nutrimentKey ='energy-kcal';
        break;
      case 'protein':
        nutrimentKey = 'proteins';
        break;
      case 'total-sugar':
        nutrimentKey = 'carbohydrate';
        break;
      case 'total-carbohydrate':
        nutrimentKey = 'carbohydrate';
        break;
      case 'total-fat':
        accum[key].quantity = 'fat';
        break;
      default:
        nutrimentKey = key;
        break;
    }

    if(data?.product?.nutriments[nutrimentKey]) {
      accum[key] = accum[key] || {};
      accum[key].name = value.name;
      accum[key].unit = value.unit;
      if(data.product.nutriments[nutrimentKey + '_unit'] === ( 'mg' || 'ml' )) {
        accum[key].quantity = data.product.nutriments[nutrimentKey] * 1000;
      }
      else {
        accum[key].quantity = data.product.nutriments[nutrimentKey];
      }
    }
    return accum;
  }, {});

  return formatted;
}

export const getFoodFacts = async (code) => {
  return fetch(openFoodFacts(code), {
    method: 'GET',
    headers : {
      'Origin': 'helth.app (testing)'
    }
  })
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    throw error(404, `barcode ${code} not found @ OpenFoodFacts API`);
  })
  .then(json => formatOpenFood(json));
}

export const formatSource2 = (data) => {
  const nutrientsObj = Object.entries(data.data.product_details.nutrition_labels)
    .reduce((accum, key) => {
      let nutrientName = snake_case(key[0]);

      switch(nutrientName) {
        case 'fat':
          nutrientName = 'total_fat';
          break;
        case 'carbs':
          nutrientName = 'total_carbohydrate';
          break;
      }
      
      if(nutrientName !== 'serving') {
        accum[nutrientName] = accum[nutrientName] || {};
        accum[nutrientName].unit = ( key[1].uom ? key[1].uom : list[nutrientName]?.unit );
        accum[nutrientName].name = ( list[nutrientName].name );
        accum[nutrientName].quantity = ( key[1].total_quantity ? String(key[1].total_quantity) : '0' );
      }
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
