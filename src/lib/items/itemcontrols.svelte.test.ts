import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import ItemControls from './ItemControls.svelte';
import { defaultInventory } from '../../vitest/defaultInventory';

it('shows buttons + servings controls', () => {
  render(ItemControls, { item: defaultInventory[0] });
  expect(screen.getByRole('spinbutton', { name: 'Servings' })).toBeVisible();
  expect(screen.getByRole('button', { name: '➕' })).toBeVisible();
  expect(screen.getByRole('button', { name: '✏️' })).toBeVisible();
  expect(screen.getByRole('button', { name: '⏩' })).toBeVisible();
  expect(screen.getByRole('button', { name: '🗑️' })).toBeVisible();
});

it('adds an item to the daily total', async () => {
  const user = userEvent.setup();
  const addClick = vi.fn();

  render(ItemControls, { item: defaultInventory[0], onAddClick: addClick });

  await user.click(screen.queryByRole('button', { name: '➕' }) as Element);

  expect(addClick).toHaveBeenCalledOnce();
});

it('can edit an item', async () => {
  const user = userEvent.setup();
  const editClick = vi.fn();
  render(ItemControls, { item: defaultInventory[0], onEditClick: editClick });
  await user.click(screen.queryByRole('button', { name: '✏️' }) as Element);

  expect(editClick).toHaveBeenCalledOnce();
});

it('duplicates an item', async () => {
  const user = userEvent.setup();
  const duplicateClick = vi.fn();
  render(ItemControls, { item: defaultInventory[0], onDuplicateClick: duplicateClick });
  await user.click(screen.queryByRole('button', { name: '⏩' }) as Element);

  expect(duplicateClick).toHaveBeenCalledOnce();
});
it('deletes an item', async () => {
  const user = userEvent.setup();
  const deleteClick = vi.fn();
  render(ItemControls, { item: defaultInventory[0], onDeleteClick: deleteClick });
  await user.click(screen.queryByRole('button', { name: '🗑️' }) as Element);

  expect(deleteClick).toHaveBeenCalledOnce();
});
