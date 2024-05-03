import { defaultSettingsStoreValues } from '../../vitest/defaultSettingsStoreValues';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { settings } from '$stores/stores';
import { get } from 'svelte/store';
import { render, screen } from '@testing-library/svelte';
import { list } from '$utils/nutrients';
import userEvent from '@testing-library/user-event';
import Counter from './Counter.svelte';

afterEach(() => {
	vi.restoreAllMocks();
});

describe('counter component', () => {
	it('renders a counter component with matching props', () => {
		render(Counter, {
			count: 10,
			interval: 4,
			item: { ...list[0], ...{ countMax: 150 } }
		});
		expect(screen.queryByText('🍬 Added Sugars (g)')).toBeVisible();
		expect(screen.queryByLabelText('🍬 Added Sugars (g)')).toHaveValue(10);
		expect(screen.queryByRole('button', { name: '-4' })).toBeVisible();
		expect(screen.queryByRole('button', { name: '+4' })).toBeVisible();
	});

	it('changes the count value when a button is clicked', async () => {
		const user = userEvent.setup();
		render(Counter, {
			count: 5,
			interval: 2,
			item: { ...list[0], ...{ countMax: 150 } }
		});
		await user.click(screen.getByRole('button', { name: '-2' }));
		expect(screen.queryByLabelText('🍬 Added Sugars (g)')).toHaveValue(3);
	});
});

describe('options', () => {
	it('clicking options button shows controls', async () => {
		const user = userEvent.setup();
		render(Counter, {
			count: 10,
			interval: 4,
			item: { ...list[0], ...{ countMax: 150 } }
		});

		expect(screen.queryByLabelText('Adjust -/+ interval')).toBeNull();

		await user.click(screen.getByRole('button', { name: '...' }));
		expect(screen.queryByLabelText('Adjust -/+ interval')).toBeVisible();
	});

	it('clicking outside of options hides controls', async () => {
		const user = userEvent.setup();
		render(Counter, {
			count: 10,
			item: { ...list[0], ...{ countMax: 150 } },
			interval: 4
		});

		await user.click(screen.getByRole('button', { name: '...' }));
		expect(screen.queryByLabelText('Adjust -/+ interval')).toBeVisible();

		await user.click(screen.getByLabelText('🍬 Added Sugars (g)'));
		setTimeout(() => expect(screen.queryByLabelText('Adjust -/+ interval')).toBeNull(), 120);
	});

	it('hides a counter when checkbox is checked', async () => {
		const user = userEvent.setup();
		render(Counter, {
			count: 10,
			item: { ...list[2], ...{ countMax: 150 } },
			interval: 4
		});

		await user.click(screen.getByRole('button', { name: '...' }));

		const box = screen.getByRole('checkbox', { name: 'Show this counter?' });
		expect(box).toBeChecked();
		await user.click(box);

		const newStore: any = get(settings);
		expect(newStore.calories.value.enabled).toBe(false);
	});
});

vi.mock('$stores/stores', async () => {
	const { writable } = await import('svelte/store');
	return {
		settings: {
			...writable(defaultSettingsStoreValues),
			set: vi.fn(),
			init: vi.fn()
		}
	};
});
