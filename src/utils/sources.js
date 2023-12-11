import { snake_case } from '$utils/naming.js';
import { list } from '$utils/nutrients';
import { error } from '@sveltejs/kit';

const openFoodFacts = (code) => {
  // // staging data
  // return `https://world.openfoodfacts.net/api/v2/product/${code}.json?fields=product_name,nutriments,ingredients_text,serving_size,serving_quantity`
  // production data
  return `https://world.openfoodfacts.org/api/v2/product/${code}.json?fields=product_name,nutriments,ingredients_text,serving_size,serving_quantity`
}

const formatOpenFood = (data) => {
  const formatted = {};
  formatted.name = data?.product?.product_name_en || data?.product?.product_name;
  formatted.description = data.product.ingredients_text;
  formatted.barcode = data.code;

  // nutrients require bulk of the effort to format
  // since Open Food Facts API data is often incomplete
  formatted.nutrients = list.reduce((accum, [key, value]) => {

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
        nutrimentKey = 'fat';
        break;
      default:
        nutrimentKey = key;
        break;
    }

    if(data?.product?.nutriments[nutrimentKey] && data.product.nutriments[nutrimentKey + '_unit'] !== ('dv' || '% vol')) {
      accum[key] = accum[key] || {};
      accum[key].name = value.name;
      accum[key].unit = value.unit;

      let modifier = 1;
      switch(data.product.nutriments[nutrimentKey + '_unit']) {
        case 'mg':
        case 'ml':
          modifier = 1000;
          break;
        case 'μg':
          modifier = 10000;
          break;
        case 'cl':
          modifier = 100;
          break
        default:
          modifier = 1;
          break;
      }

      // Data returned from the API isn't always complete.
      // One of the downsides to crowdsourcing.
      // This is a best effort to get all values according to available data.
      const amount =  (data?.product?.nutriments[nutrimentKey + '_100g'] * data?.product?.serving_quantity * modifier) / 100
        || data?.product?.nutriments[nutrimentKey + '_value_computed']
        || data?.product?.nutriments[nutrimentKey + '_serving'] * modifier 
        || data.product.nutriments[nutrimentKey] * modifier;

      accum[key].quantity = Math.round(amount);
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
        const found = list.find((nutrient) => nutrient.key === nutrientName);
        accum[nutrientName] = accum[nutrientName] || {};
        accum[nutrientName].unit = ( key[1].uom ? key[1].uom : found.unit );
        accum[nutrientName].name = ( found.name );
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
