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
							type: 'eval',
							evalDaysLeft: 14
						}
					})
				},
				syncState: { ...readable({}) },
				login: vi.fn(async () => Promise.resolve()),
				sync: vi.fn(async () => Promise.resolve())
			}
		}
	};
});

describe('sign in form (logged out)', () => {
	it('shows logout button', () => {
		render(SyncForm);
		expect(screen.getByRole('button', { name: 'Logout' })).toBeVisible();
	});
});
