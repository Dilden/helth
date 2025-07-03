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
					clear: vi.fn()
				};
			})
		}
	};
});

describe('sign in form (logged in premium)', () => {
	it('shows logout button', () => {
		render(SyncForm);
		expect(screen.getByText('Thanks for supporting helth.app!')).toBeVisible();
		expect(screen.getByRole('button', { name: 'Logout' })).toBeVisible();
	});
});
