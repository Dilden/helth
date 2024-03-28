import 'fake-indexeddb/auto';
import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

it('shows counters for all nutrients', async () => {
	render(Page);
	expect(await screen.findByText('⚡ Calories (kcal)')).toBeVisible();
	expect(await screen.findByText('🍗 Protein (g)')).toBeVisible();
	expect(await screen.findByText('🍌 Potassium (mg)')).toBeVisible();
	expect(await screen.findByText('Zinc (mg)')).toBeVisible();
});
