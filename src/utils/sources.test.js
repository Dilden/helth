import { it, expect } from 'vitest';
import { formatSource2 } from './sources.js';

it('formatSource2 returns expected object from given upc barcode', async () => {
  const formatted = formatSource2(fakeApiData);

  expect(formatted).toEqual({
    name: 'Orville Redenbachers Gourmet Popping Corn',
    description: 'Movie Theater Popcorn, Microwave, Value Size',
    barcode: '2700052385',
    nutrients: {
      calories: {
        name: 'Calories',
        quantity: '160',
        unit: 'kcal'
      },
      calcium: {
        name: 'Calcium',
        quantity: '0',
        unit: 'mg'
      },
      iron: {
        name: 'Iron',
        quantity: '0.5',
        unit: 'mg'
      },
      protein: {
        name: 'Protein',
        quantity: '2',
        unit: 'g'
      },
      sodium: {
        name: 'Sodium',
        quantity: '340',
        unit: 'mg'
      },
      total_fat:  {
        name: 'Total Fat',
        quantity: '10',
        unit: 'g'
      },
    }
  });
})

const fakeApiData = {
  status: 'success',
  data: {
    product_details: {
      brand_name: 'Orville Redenbachers',
      fit_score: 48,
      fit_score_label: 'Medium match for you',
      fit_score_type: 'MEDIUM',
      id: 375394,
      isThrive: false,
      nutrition_labels: {
        Calcium: {
          uom: 'mg',
          breakdown: null,
          total_quantity: 0,
          total_percentage: 0
        },
        Iron: {
          uom: 'mg',
          breakdown: null,
          total_quantity: 0.5,
          total_percentage: 2
        },
        Protein: { uom: 'g', breakdown: null, total_quantity: 2, total_percentage: 0 },
        Calories: {
          uom: '',
          breakdown: { 'Fat Calories': [Object] },
          total_quantity: 160,
          total_percentage: 8
        },
        Sodium: {
          uom: 'mg',
          breakdown: null,
          total_quantity: 340,
          total_percentage: 15
        },
        Fat: {
          uom: 'g',
          breakdown: { 'Trans Fat': [Object], 'Saturated Fat': [Object] },
          total_quantity: 10,
          total_percentage: 13
        }
      },
      productPrice: null,
      product_description: 'Movie Theater Popcorn, Microwave, Value Size',
      product_image: 'https://prod.shopwell.com/gladson/00027000523858_thumb.png',
      product_image_full: 'https://prod.shopwell.com/gladson/00027000523858_full.jpg',
      product_name: 'Gourmet Popping Corn',
      product_size: 12,
      product_size_unit: 'ea',
      upc: '2700052385'
    },
    trade_up_mode: true,
    campaignTradeUps: []
  }
}
