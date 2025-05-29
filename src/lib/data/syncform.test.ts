import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import SyncForm from './SyncForm.svelte';

describe('sign in form', () => {
	it('shows form and input for email', () => {
		render(SyncForm);
		expect(screen.getByLabelText('Email')).toBeVisible();
		expect(screen.getByRole('button', { name: 'Submit' })).toBeVisible();
		expect(screen.getByRole('form')).toBeVisible();
	});
	it('emits an event on click', async () => {
		const user = userEvent.setup();

		render(SyncForm);
		await user.type(screen.getByLabelText('Email'), 'test@test.com');
		await user.click(screen.getByRole('button', { name: 'Submit' }));
		expect(screen.getByText('Click the link in your email!')).toBeVisible();
	});
});
