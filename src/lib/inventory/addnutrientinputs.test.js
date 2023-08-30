import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import AddNutrientInputs from './AddNutrientInputs.svelte';


describe('add nutrients to an item form inputs', () => {
  it('has 2 inputs', () => {
    render(AddNutrientInputs);
    expect(screen.getByLabelText('Name 1')).toBeVisible();
    expect(screen.getByLabelText('Quantity 1')).toBeVisible();
  });
  it('has input names based on count passed in', () => {
    render(AddNutrientInputs, {count: 4});
    expect(screen.getByLabelText('Name 4')).toBeVisible();
    expect(screen.getByLabelText('Quantity 4')).toBeVisible();
  });
})
