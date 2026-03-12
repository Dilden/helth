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
					...readable({})
				},
				syncState: {
					...readable({
						error: true
					})
				}
			},
			table: vi.fn(() => {
				return {
					toArray: vi.fn(async () => Promise.resolve([]))
				};
			})
		}
	};
});

it('has a syncState error', () => {
	render(SyncForm);
	expect(
		screen.getByText('An error syncing your data has been encountered. Please contact', {
			exact: false
		})
	).toBeVisible();
});
