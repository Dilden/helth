import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import RecipeForm from './RecipeForm.svelte';

describe('recipe form', () => {
  it('has text inputs for name and description', () => {
    render(RecipeForm);
    expect(screen.getByLabelText('Recipe Name')).toBeVisible();
    
    expect(screen.getByLabelText('Recipe Description')).toBeVisible();
  })
})
