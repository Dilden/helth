import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import AddNutrientInputs from './AddNutrientInputs.svelte';


describe('add nutrients to an item form inputs', () => {
  it('has a section title', () => {
    render(AddNutrientInputs);
    expect(screen.getByRole('heading', {name: 'Nutrients'})).toBeVisible();
  })
  it('has inputs for each tracked nutrient', () => {
    render(AddNutrientInputs);
    expect(screen.getByLabelText('Calories')).toBeVisible();
    expect(screen.getByLabelText('Cholesterol')).toBeVisible();
    expect(screen.getByLabelText('Total Sugars')).toBeVisible();
  });
  it('has hidden inputs for unit of measurment', () => {
    render(AddNutrientInputs);
    expect(screen.getByLabelText('calories-unit')).toBeInTheDocument();
    expect(screen.getByLabelText('added_sugars-unit')).toBeInTheDocument();
    expect(screen.getByLabelText('cholesterol-unit')).toBeInTheDocument();
  });
})
