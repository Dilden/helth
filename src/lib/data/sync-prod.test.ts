import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import SyncForm from './SyncForm.svelte';

beforeAll(() => {
	vi.useFakeTimers();
	vi.setSystemTime(new Date('Wed Dec 10 2025'));
});

afterEach(() => {
	vi.restoreAllMocks();
	vi.useRealTimers();
});

vi.mock('$stores/stores.svelte', () => {
	return {
		subscription: {
			get: vi.fn(() => {
				return {
					subscriptionId: '4566789',
					status: 'prod',
					validUntilDate: 1793422800000,
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
							type: 'prod',
							status: 'ok'
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
	it('shows logout button with subscriptionId value in form', () => {
		render(SyncForm);
		expect(screen.getByDisplayValue('4566789')).toBeInTheDocument();
		expect(screen.getByText('Active 🥰')).toBeVisible();
		expect(screen.getByRole('button', { name: 'Logout' })).toBeVisible();
	});
});
