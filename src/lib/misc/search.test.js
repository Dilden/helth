import "fake-indexeddb/auto";
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Search from './Search.svelte';

describe('search bar', () => {
  it('has a text input as a search form', () => {
    render(Search);
    expect(screen.getByLabelText('Search')).toBeVisible();
  })
  it('has a button to clear the search', () => {
    render(Search);
    expect(screen.getByRole('button', {name: 'Clear search'})).toBeVisible();
  })
  it('clicking clear button clears the text input', async () => {
    const user = userEvent.setup();
    render(Search, {
      searchStoreVal: 'testing'
    });

    await user.click( screen.getByRole('button', {name: 'Clear search'}) )
    expect(screen.getByLabelText('Search')).toHaveValue('');
  })
})
