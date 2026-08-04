import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import NutrientItem from './NutrientItem.svelte';

it('shows a nutrient', () => {
  render(NutrientItem, {
    nutrient: {
      name: 'Water',
      quantity: 400,
      unit: 'ml'
    }
  });
  expect(screen.getByText('Water: 400ml')).toBeVisible();
});
