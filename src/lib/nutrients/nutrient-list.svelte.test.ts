import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import NutrientList from './NutrientList.svelte';

it('shows a list of nutrients', () => {
  render(NutrientList, {
    list: [
      {
        name: 'Water',
        quantity: 400,
        unit: 'ml'
      },
      {
        name: 'Calories',
        quantity: 100,
        unit: 'kcal'
      },
      {
        name: 'Protein',
        quantity: 100,
        unit: 'g'
      }
    ]
  });
  expect(screen.getByText('Water: 400ml')).toBeVisible();
  expect(screen.getByText('Calories: 100kcal')).toBeVisible();
  expect(screen.getByText('Protein: 100g')).toBeVisible();
});
