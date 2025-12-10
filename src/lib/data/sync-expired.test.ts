import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import SyncForm from './SyncForm.svelte';

beforeAll(() => {
	vi.useFakeTimers();
	vi.setSystemTime(new Date('Wed Dec 10 2024'));
});

afterEach(() => {
	vi.restoreAllMocks();
});

vi.mock('$stores/stores.svelte', () => {
	return {
		subscription: {
			get: vi.fn(() => {
				return {
					subscriptionId: '4566789',
					status: 'prod',
					validUntilDate: 1793422800000, // Oct 31, 2026
					renewalDate: 1793422800000
				};
			})
		}
	};
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
							type: 'eval',
							evalDaysLeft: 0
						}
					})
				},
				syncState: { ...readable({}) },
				login: vi.fn(async () => Promise.resolve()),
				sync: vi.fn(async () => Promise.resolve())
			},
			table: vi.fn(() => {
				return {
					toArray: vi.fn(() => ['one'])
				};
			})
		}
	};
});

describe('sign in form (logged in premium)', () => {
	it('informs user trial has expired and providese payment options', () => {
		render(SyncForm);
		expect(
			screen.getByText(
				'Trial period expired! Please purchase a subscription to use cloud sync features.'
			)
		).toBeVisible();
		expect(screen.getByRole('radio', { name: '$1/month' })).toBeVisible();
		expect(screen.getByRole('radio', { name: '$10/year' })).toBeVisible();
	});
});
