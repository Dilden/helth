import 'fake-indexeddb/auto';
import Page from './+page.svelte';
import { it, expect, vi, afterEach, describe } from 'vitest';
import { render, screen } from '@testing-library/svelte';

afterEach(() => {
	vi.resetAllMocks();
});

vi.mock('$stores/stores.svelte', () => {
	return {
		subscription: {
			init: vi.fn(async () => Promise.resolve(console.log('subscription init')))
		},
		initStores: vi.fn(async () => Promise.resolve())
	};
});

vi.mock('$stores/db/', () => {
	return {
		db: {
			cloud: {
				sync: vi.fn(async () => Promise.resolve())
			}
		}
	};
});

it('renders the sync form on the page', async () => {
	render(Page);
	expect(await screen.findByText('Cloud Sync')).toBeVisible();
	expect(await screen.findByRole('button')).toBeVisible();
});

describe('status alerts via toasts', () => {
	it('shows success toast', async () => {
		render(Page, { status: 'success', message: 'It worked!' });
		expect(await screen.findByText('It worked!')).toBeVisible();
	});
	it('shows cancelled alert', async () => {
		render(Page, { status: 'cancelled', message: 'Cancelled it!' });
		expect(await screen.findByText('Cancelled it!')).toBeVisible();
	});
	it('shows error alert', async () => {
		render(Page, { status: 'error', message: 'It failed!' });
		expect(await screen.findByText('It failed!')).toBeVisible();
	});
});
