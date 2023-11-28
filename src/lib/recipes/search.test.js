import "fake-indexeddb/auto";
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { type, click } from '@testing-library/user-event';
import Search from './Search.svelte';

describe('search bar', () => {
  it('has a text input as a search form', () => {
    render(Search);
    expect(screen.getByLabelText('Search Recipes')).toBeVisible();
  })
  it('has a button to clear the search', () => {
    render(Search);
    expect(screen.getByRole('button', {name: 'Clear search'})).toBeVisible();
  })
  it('clicking clear button clears the text input', async () => {
    render(Search);
    await type( screen.getByLabelText('Search Recipes'), 'testing' );
    expect(screen.getByLabelText('Search Recipes')).toHaveValue('testing');

    await click( screen.getByRole('button', {name: 'Clear search'}) )
    expect(screen.getByLabelText('Search Recipes')).toHaveValue('');
  })
})
