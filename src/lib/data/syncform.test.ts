import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
// import userEvent from '@testing-library/user-event';
import SyncForm from './SyncForm.svelte';

describe('sign in form', () => {
	it('shows login button', () => {
		render(SyncForm);
		expect(screen.getByRole('button', { name: 'Login' })).toBeVisible();
	});
	// it('emits an event on click', async () => {
	// 	const user = userEvent.setup();

	// 	render(SyncForm);
	// 	await user.type(screen.getByLabelText('Email'), 'test@test.com');
	// 	await user.click(screen.getByRole('button', { name: 'Submit' }));
	// 	expect(screen.getByText('Click the link in your email!')).toBeVisible();
	// });
});
