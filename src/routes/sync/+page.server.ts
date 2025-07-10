import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { StripeService } from '$utils/stripeservice';

export const prerender = false;

export const actions = {
	subscribe: async ({ request, cookies }) => {
		const formData = await request.formData();
		const priceId = formData.get('subscription') as string;
		const session = await StripeService.subscribe(priceId);

		if (session?.url) {
			redirect(303, session.url);
		}

		redirect(302, '/sync?error=true');
	},
	cancel: async ({ request, cookies }) => {
		const formData = await request.formData();
		console.log(formData);
	}
} satisfies Actions;

export const load: PageServerLoad = ({ url }) => {
	if (url.searchParams.has('success')) {
		return {
			payment: {
				status: 'success'
			}
		};
	} else if (url.searchParams.has('cancelled')) {
		return {
			payment: {
				status: 'cancelled'
			}
		};
	} else if (url.searchParams.has('error')) {
		return {
			payment: {
				status: 'error'
			}
		};
	}
	return {};
};
