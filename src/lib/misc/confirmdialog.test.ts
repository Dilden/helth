import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import ConfirmDelete from './ConfirmDialog.svelte';

it('has buttons asking user to confirm deletion', () => {
	render(ConfirmDelete, { message: 'Sample message' });
	expect(screen.getByText('Sample message')).toBeVisible();
	expect(screen.getByRole('button', { name: 'Yes' })).toBeVisible();
	expect(screen.getByRole('button', { name: 'No' })).toBeVisible();
});

it('runs callback fn on confirm', async () => {
	const user = userEvent.setup();
	const props = {
		message: 'Sample message',
		callbackConfirm: vi.fn(() => true)
	};
	render(ConfirmDelete, props);

	expect(props.callbackConfirm).not.toHaveBeenCalled();

	await user.click(screen.getByRole('button', { name: 'Yes' }));

	expect(props.callbackConfirm).toHaveBeenCalled();
});

it('runs callback fn on deny', async () => {
	const user = userEvent.setup();
	const props = {
		callbackDeny: vi.fn(() => false)
	};
	render(ConfirmDelete, props);

	expect(props.callbackDeny).not.toHaveBeenCalled();

	await user.click(screen.getByRole('button', { name: 'No' }));

	expect(props.callbackDeny).toHaveBeenCalled();
});
