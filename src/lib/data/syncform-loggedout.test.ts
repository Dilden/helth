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
						name: 'unauthorized',
						userId: 'unauthorized',
						license: {
							type: 'eval',
							evalDaysLeft: 0
						}
					})
				},
				syncState: { ...readable({}) }
			},
			table: vi.fn(() => {
				return {
					toArray: vi.fn(async () => Promise.resolve([]))
				};
			})
		}
	};
});
describe('sign in form (logged out)', () => {
	it('shows login button', () => {
		render(SyncForm);
		expect(screen.getByRole('button', { name: 'Login' })).toBeVisible();
	});
});
