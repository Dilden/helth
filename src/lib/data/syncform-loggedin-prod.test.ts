import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import SyncForm from './SyncForm.svelte';

afterEach(() => {
	vi.restoreAllMocks();
});

vi.mock('$stores/db', async () => {
	const { readable } = await import('svelte/store');
	return {
		db: {
			cloud: {
				currentUser: {
					...readable({
						name: 'Bob',
						license: {
							type: 'prod'
						}
					})
				},
				syncState: { ...readable({}) },
				login: vi.fn(async () => Promise.resolve()),
				sync: vi.fn(async () => Promise.resolve())
			},
			table: vi.fn(() => {
				return {
					clear: vi.fn(),
					toArray: vi.fn(async () => Promise.resolve(['one']))
				};
			})
		}
	};
});

describe('sign in form (logged in premium)', () => {
	it('shows logout button', () => {
		render(SyncForm, {
			subscription: {
				subscriptionId: '4566789',
				status: 'prod',
				validUntilDate: 1793422800000,
				renewalDate: 1793422800000
			}
		});
		expect(screen.getByDisplayValue('4566789')).toBeInTheDocument();
		expect(screen.getByText('Active 🥰')).toBeVisible();
		expect(screen.getByRole('button', { name: 'Logout' })).toBeVisible();
	});

	it('shows an error if no subscriptionId is provided', () => {
		render(SyncForm);
		expect(screen.getByText('Subscribe', { exact: false })).toBeVisible();
	});
});
