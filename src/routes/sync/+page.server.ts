import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { StripeService } from '$utils/stripeservice';
import { getToken, activateUser } from '$utils/dexieservice';

export const prerender = false;

export const actions = {
	subscribe: async ({ request }) => {
		const formData = await request.formData();
		const priceId = formData.get('subscription') as string;
		const session = await StripeService.subscribe(priceId);

		if (session?.url) {
			redirect(303, session.url);
		}

		redirect(302, '/sync?error=true');
	},
	cancel: async ({ request }) => {
		const formData = await request.formData();

		await StripeService.cancel((await formData.get('subscriptionId')) as string);
		redirect(302, '/sync?cancelled=true');
	}
} satisfies Actions;

export const load: PageServerLoad = async ({ url, fetch }) => {
	if (url.searchParams.has('success') && url.searchParams.has('session_id')) {
		// check request has session_id
		const session_id = url.searchParams.get('session_id');
		if (session_id == null) {
			return error;
		}

		// check if session is valid
		const session = await StripeService.getSession(session_id);
		if (session == null) {
			return { ...error, message: 'Invalid payment session' };
		}

		// get Dexie Cloud token
		const token = await getToken();
		if (!token.ok) {
			return {
				...error,
				message:
					'Error authenticating with cloud service. If this issue persists, contact support@helth.app for assistance.'
			};
		}
		const { accessToken } = await token.json();

		// get email used in payment
		let email = session.customer_email || session.customer_details?.email;
		if (email == null) {
			return { ...error, message: 'No email provided to activate your account!' };
		}

		// 2) check if payment was successful
		if (session?.payment_status != 'paid') {
			return { ...error, message: 'Payment failed. Unable to activate your account.' };
		}

		// activate account with provided email
		const res = await activateUser(
			{
				userId: email,
				type: 'prod',
				data: {
					email: email,
					name: email
				}
			},
			accessToken
		);

		// TODO: insert subscription info into cloud DB for user
		if (!res.ok) {
			return {
				...error,
				message:
					'Something went wrong activating your account. Please contact support@helth.app for assistance.'
			};
		}
		return success;
	} else if (url.searchParams.has('cancelled')) {
		return cancelled;
	} else if (url.searchParams.has('error')) {
		return error;
	}
	return {
		status: null
	};
};

const error = {
	status: 'error',
	message:
		'Whoops! Something went wrong processing your payment. If this issue persists, please contact support@helth.app'
};
const success = {
	status: 'success',
	subscription: {
		id: null,
		customderId: null,
		subscriptionId: null,
		subscriptionStatus: 'active',
		subscriptionStartDate: 0
	}
};
const cancelled = {
	status: 'cancelled'
};
