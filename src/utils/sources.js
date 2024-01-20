import { list } from '$utils/nutrients';
import { error } from '@sveltejs/kit';

const openFoodFacts = (code) => {
  // // staging data
  // return `https://world.openfoodfacts.net/api/v2/product/${code}.json?fields=product_name,nutriments,ingredients_text,serving_size,serving_quantity`
  // production data
  return `https://world.openfoodfacts.org/api/v2/product/${code}.json?fields=product_name,nutriments,ingredients_text,serving_size,serving_quantity`
}

export const formatOpenFood = (data) => {
  const formatted = {};
  formatted.name = data?.product?.product_name_en || data?.product?.product_name;
  formatted.description = data.product.ingredients_text;
  formatted.barcode = data.code;

  // nutrients require bulk of the effort to format
  // since Open Food Facts API data is often incomplete
  formatted.nutrients = list.reduce((accum, {key, name, unit}) => {
    
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

      accum.push({
        key: key,
        name: name,
        unit: unit,
        quantity: Math.round(amount)
      });
    }
    return accum;
  }, []);

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
    error(404, `barcode ${code} not found @ OpenFoodFacts API`);
  })
  .then(json => formatOpenFood(json));
}
