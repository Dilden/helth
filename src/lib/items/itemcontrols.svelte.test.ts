import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
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
