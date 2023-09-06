import 'fake-indexeddb/auto';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import AddItem from './AddItem.svelte';


describe('add item to inventory form', () => {
  it('has a button + form', () => {
    render(AddItem);
    expect(screen.queryByRole('button', { name: 'Add Item'})).toBeVisible();
    expect(screen.queryByLabelText('Name').parentNode).toBeVisible();
  });
})


