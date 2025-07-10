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

    if(session?.client_secret) {
      cookies.set("client_secret", session.client_secret, {
        path: "/settings",
        httpOnly: true,
        secure: true
      })
    }

		redirect(302, '/settings');
	},
	cancel: async ({ request, cookies }) => {
		const formData = await request.formData();
		console.log(formData);
	}
} satisfies Actions;

// export const load: PageServerLoad = ({ params }) => {
// 	return {
// 		tab: 'sync'
// 	};
// };
