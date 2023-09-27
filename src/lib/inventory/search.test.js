import "fake-indexeddb/auto";
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Search from './Search.svelte';

describe('search bar', () => {
  it('has a text input as a search form', () => {
    render(Search);
    expect(screen.getByLabelText('Search')).toBeVisible();
  })
})
