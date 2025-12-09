import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import CancelForm from './CancelForm.svelte';

describe('cancelling a subscription', () => {
	it('renders a form with subscriptionId in hidden input', () => {
		render(CancelForm, {
			subscriptionId: '123456789'
		});

		expect(screen.getByRole('form')).toHaveFormValues({
			subscriptionId: '123456789'
		});
	});
	it('removes # char from subscriptionId in hidden input', () => {
		render(CancelForm, {
			subscriptionId: '#123456789'
		});

		expect(screen.getByRole('form')).toHaveFormValues({
			subscriptionId: '123456789'
		});
	});
});
