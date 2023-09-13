import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ConfirmDelete from './ConfirmDialog.svelte';

it('has buttons asking user to confirm deletion', () => {
  render(ConfirmDelete, {message: 'Sample message'});
  expect(screen.getByText('Sample message')).toBeVisible();
  expect(screen.getByRole('button', {name: 'Yes'})).toBeVisible();
  expect(screen.getByRole('button', {name: 'No'})).toBeVisible();
})

