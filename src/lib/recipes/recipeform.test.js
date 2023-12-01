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

  it('alerts user there are no items in inventory', async () => {
    render(RecipeForm);
    expect(screen.getByText('No items found in inventory! Go scan something or Add an Item to your Inventory manually before creating a recipe.')).toBeVisible();
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

  it('prefills the fields with data from provided item', () => {
    render(RecipeForm, {
      recipe: {
        id: 10,
        name: 'noodles',
        description: 'a lazy meal',
        items: [
          {
            id: 1,
            name: 'First',
            description: 'description goes here'
          },
        ],
      },
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
        },
        {
          id: 3,
          name: 'third thing',
          description: 'tis but a test'
        }
      ]
    });

    expect(screen.getByLabelText('Recipe Name')).toHaveValue('noodles');
    expect(screen.getByLabelText('Recipe Description')).toHaveValue('a lazy meal');
    expect(screen.getByLabelText('First')).toBeChecked();
    expect(screen.getByLabelText('Second')).not.toBeChecked();
  })

  it('shows a search box to filter inventory items', () => {
    render(RecipeForm, {
      inventoryItems: [
        {
          id: 10,
          name: 'demo',
          description: 'description goes here'
        }
      ]
    });
    expect(screen.getByLabel('Search inventory')).toBeVisible();
  })
})
