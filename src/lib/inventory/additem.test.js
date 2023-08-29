import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import AddItem from './AddItem.svelte';


describe('add item to inventory form', () => {
  it('has a button + form', () => {
    render(AddItem);
    expect(screen.queryByRole('button', { name: 'Add Item'})).toBeVisible();
    expect(screen.queryByLabelText('Title').parentNode).toBeVisible();
  });
  it('has a button to add nutrients', () => {
    render(AddItem);
    expect(screen.queryByRole('button', { name: 'Add Nutrient'})).toBeVisible();
  });
})
