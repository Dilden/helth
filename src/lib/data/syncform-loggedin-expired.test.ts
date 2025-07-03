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
							evalDaysLeft: 0
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

describe('sign in form (logged in premium)', () => {
	it('shows logout button', () => {
		render(SyncForm);
		expect(
			screen.getByText(
				'Trial period expired! Please purchase a subscription to use cloud sync features.'
			)
		).toBeVisible();
		expect(screen.getByRole('link', { name: '$1 monthly' })).toBeVisible();
		expect(screen.getByRole('link', { name: '$10 annually' })).toBeVisible();
	});
});
