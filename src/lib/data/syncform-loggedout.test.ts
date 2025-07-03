import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import SyncForm from './SyncForm.svelte';

describe('sign in form (logged out)', () => {
	it('shows login button', () => {
		render(SyncForm);
		expect(screen.getByRole('button', { name: 'Login' })).toBeVisible();
	});
});
