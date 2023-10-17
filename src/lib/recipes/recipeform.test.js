import 'fake-indexeddb/auto';
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import RecipeForm from './RecipeForm.svelte';

describe('recipe form', () => {
  it('has text inputs for name and description', async () => {
    render(RecipeForm);
    expect(screen.getByLabelText('Recipe Name')).toBeVisible();
    
    expect(screen.getByLabelText('Recipe Description')).toBeVisible();
  })

  it('shows inventory items in checkboxes', async () => {
    render(RecipeForm, {
      inventoryItems: [
        {
          id: 1,
          name: 'First',
          description: 'description goes here'
        },
        {
          id: 2,
          name: 'Second',
          description: 'also goes here'
        }
      ]
    })

    expect(screen.getByRole('checkbox', {name: 'First'})).toBeVisible();
    expect(screen.getByRole('checkbox', {name: 'Second'})).toBeVisible();
  })
})
