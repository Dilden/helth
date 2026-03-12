import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import CancelForm from './CancelForm.svelte';

describe('subscription cancelling logic', () => {
	it('renders a form with subscriptionId in hidden input', () => {
		render(CancelForm, {
			subscriptionId: '123456789'
		});

		expect(screen.getByRole('form')).toHaveFormValues({
			subscriptionId: '123456789'
		});
		expect(screen.getByText('Cancel Subscription')).toBeVisible();
	});
	it('removes # char from subscriptionId in hidden input', () => {
		render(CancelForm, {
			subscriptionId: '#123456789'
		});

		expect(screen.getByRole('form')).toHaveFormValues({
			subscriptionId: '123456789'
		});
	});

	// it('prompts to ensure user wants to cancel', async () => {
	// 	const user = userEvent.setup();
	// 	render(CancelForm, {
	// 		subscriptionId: '#123456789'
	// 	});

	// 	await user.click(screen.getByRole('button', { name: 'Cancel Subscription' }));

	// 	expect(
	// 		screen.queryByText(
	// 			'Are you sure you want to cancel your subscription? Cloud sync will remain active until the end of your current billing cycle.'
	// 		)
	// 	).toBeVisible();
	// });
});
