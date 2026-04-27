import 'fake-indexeddb/auto';
import Page from './+page.svelte';
import { successToast, infoToast, errorToast } from '$utils/toast';
import { it, expect, vi, afterAll, describe } from 'vitest';
import { render, screen } from '@testing-library/svelte';

afterAll(() => {
	vi.resetAllMocks();
});

vi.mock('$stores/stores.svelte', () => {
	return {
		subscription: {
			init: vi.fn(async () => Promise.resolve()),
			get: vi.fn(async () => Promise.resolve({ status: true }))
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

vi.mock('$utils/toast', { spy: true });

it('renders the sync form on the page', async () => {
	render(Page);
	expect(await screen.findByText('Cloud Sync')).toBeVisible();
	expect(await screen.findByRole('button')).toBeVisible();
});

describe('receives status alerts for toasts', () => {
	it('shows success toast', () => {
		render(Page, { data: { status: 'success', message: 'It worked!' } });
		expect(successToast).toHaveBeenCalledOnce();
		expect(successToast).toHaveBeenCalledWith('It worked!');
	});
	it('shows cancelled alert', async () => {
		render(Page, { data: { status: 'cancelled', message: 'Cancelled it!' } });
		expect(infoToast).toHaveBeenCalledWith('Cancelled it!');
	});
	it('shows error alert', async () => {
		render(Page, { data: { status: 'error', message: 'It failed!' } });
		expect(errorToast).toHaveBeenCalledWith('It failed!');
	});
});
