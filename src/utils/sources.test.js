import { it, expect } from 'vitest';
import { formatOpenFood } from './sources.js';

it('formatOpenFood returns expected object from given upc barcode', async () => {
  const formatted = formatOpenFood(fakeApiData);

  expect(formatted).toEqual({
    name: 'Movie Theater Butter Microwave Popcorn',
    description: 'Whole Grain Popping Corn, Palm Oil, Salt, Butter, Color Added (Annatto, Turmeric, Paprika), Natural Flavor, Mixed Tocopherols (Vitamin E for freshness). CONTAINS: MILK.',
    barcode: '0027000523858',
    nutrients: [
      {
        key: 'calories',
        name: 'Calories',
        quantity: 48,
        unit: 'kcal'
      },
      {
        key: 'fiber',
        name: 'Fiber',
        quantity: 3,
        unit: 'g'
      },
      {
        key: 'iron',
        name: 'Iron',
        quantity: 0,
        unit: 'mg'
      },
      {
        key: 'protein',
        name: 'Protein',
        quantity: 1,
        unit: 'g'
      },
      {
        key: 'sodium',
        name: 'Sodium',
        quantity: 0,
        unit: 'mg'
      },
      {
        key: 'total_fat',
        name: 'Total Fat',
        quantity: 3,
        unit: 'g'
      }
    ]
  });
})

const fakeApiData = {
  "code": "0027000523858",
  "product": {
    "ingredients_text": "Whole Grain Popping Corn, Palm Oil, Salt, Butter, Color Added (Annatto, Turmeric, Paprika), Natural Flavor, Mixed Tocopherols (Vitamin E for freshness). CONTAINS: MILK.",
    "nutriments": {
      "calcium": 0,
      "calcium_100g": 0,
      "calcium_serving": 0,
      "calcium_unit": "mg",
      "calcium_value": 0,
      "carbohydrates": 15.929203539823,
      "carbohydrates_100g": 15.929203539823,
      "carbohydrates_serving": 5.42,
      "carbohydrates_unit": "g",
      "carbohydrates_value": 15.929203539823,
      "cholesterol": 0,
      "cholesterol_100g": 0,
      "cholesterol_serving": 0,
      "cholesterol_unit": "mg",
      "cholesterol_value": 0,
      "energy": 592,
      "energy-kcal": 141.59292035398,
      "energy-kcal_100g": 141.59292035398,
      "energy-kcal_serving": 48.1,
      "energy-kcal_unit": "kcal",
      "energy-kcal_value": 141.59292035398,
      "energy-kcal_value_computed": 168.042477876106,
      "energy_100g": 592,
      "energy_serving": 201,
      "energy_unit": "kcal",
      "energy_value": 141.59292035398,
      "fat": 8.8495575221239,
      "fat_100g": 8.8495575221239,
      "fat_serving": 3.01,
      "fat_unit": "g",
      "fat_value": 8.8495575221239,
      "fiber": 8.8,
      "fiber_100g": 8.8,
      "fiber_serving": 2.99,
      "fiber_unit": "g",
      "fiber_value": 8.8,
      "fruits-vegetables-nuts-estimate-from-ingredients_100g": 0,
      "fruits-vegetables-nuts-estimate-from-ingredients_serving": 0,
      "iron": 0.00106,
      "iron_100g": 0.00106,
      "iron_serving": 0.00036,
      "iron_unit": "mg",
      "iron_value": 1.06,
      "monounsaturated-fat": 10.29,
      "monounsaturated-fat_100g": 10.29,
      "monounsaturated-fat_serving": 3.5,
      "monounsaturated-fat_unit": "g",
      "monounsaturated-fat_value": 10.29,
      "nova-group": 4,
      "nova-group_100g": 4,
      "nova-group_serving": 4,
      "nutrition-score-fr": 2,
      "nutrition-score-fr_100g": 2,
      "polyunsaturated-fat": 2.94,
      "polyunsaturated-fat_100g": 2.94,
      "polyunsaturated-fat_serving": 1,
      "polyunsaturated-fat_unit": "g",
      "polyunsaturated-fat_value": 2.94,
      "potassium": 0,
      "potassium_100g": 0,
      "potassium_serving": 0,
      "potassium_unit": "mg",
      "potassium_value": 0,
      "proteins": 1.7699115044248,
      "proteins_100g": 1.7699115044248,
      "proteins_serving": 0.602,
      "proteins_unit": "g",
      "proteins_value": 1.7699115044248,
      "salt": 0.75221238938052,
      "salt_100g": 0.75221238938052,
      "salt_serving": 0.256,
      "salt_unit": "g",
      "salt_value": 0.75221238938052,
      "saturated-fat": 4.4247787610619,
      "saturated-fat_100g": 4.4247787610619,
      "saturated-fat_serving": 1.5,
      "saturated-fat_unit": "g",
      "saturated-fat_value": 4.4247787610619,
      "sodium": 0.300884955752208,
      "sodium_100g": 0.300884955752208,
      "sodium_serving": 0.102,
      "sodium_unit": "g",
      "sodium_value": 0.300884955752208,
      "sugars": 0,
      "sugars_100g": 0,
      "sugars_serving": 0,
      "sugars_unit": "g",
      "sugars_value": 0,
      "trans-fat": 0,
      "trans-fat_100g": 0,
      "trans-fat_serving": 0,
      "trans-fat_unit": "g",
      "trans-fat_value": 0,
      "vitamin-a": 0,
      "vitamin-a_100g": 0,
      "vitamin-a_serving": 0,
      "vitamin-a_unit": "IU",
      "vitamin-a_value": 0,
      "vitamin-c": 0,
      "vitamin-c_100g": 0,
      "vitamin-c_serving": 0,
      "vitamin-c_unit": "mg",
      "vitamin-c_value": 0
    },
    "product_name": "Movie Theater Butter Microwave Popcorn",
    "serving_quantity": "34",
    "serving_size": "2 tbsp (34 g) unpopped (makes about 5 cups popped) (34 g)"
  },
  "status": 1,
  "status_verbose": "product found"
}

