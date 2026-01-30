import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { StripeService } from '$utils/stripeservice';
import { getToken, updateUser } from '$utils/dexieservice';
import { toUtc } from '$utils/dates';

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

		const subscriptionId = formData.get('subscriptionId') as string;
		const res = await StripeService.cancel(subscriptionId);
		if (!res?.cancel_at_period_end) {
			// cancelling fail, contact support@helt.app to cancel your subscription
		}

		redirect(302, `/sync?cancelled=true&subscriptionId=${subscriptionId}`);
	}
} satisfies Actions;

export const load: PageServerLoad = async ({ url }) => {
	if (url.searchParams.has('success') && url.searchParams.has('session_id')) {
		// check request has session_id
		const session_id = url.searchParams.get('session_id');
		if (session_id == null) {
			return error;
		}

		// check if session is valid
		const session = await StripeService.getSession(session_id);
		if (session == null) {
			return { ...error, message: 'Invalid or expired payment session' };
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

		// Check returned types before saving subscription
		if (typeof session.subscription !== 'string' || !session.subscription) {
			return {
				...error,
				message: 'Subscription not found. Please contact support@helth.app for assistance.'
			};
		}
		if (typeof session.customer !== 'string' || !session.customer) {
			return {
				...error,
				message: 'Customer ID not found. Please contact support@helth.app for assistance.'
			};
		}

		const stripeSubscription = await StripeService.getSubscription(session.subscription);

		if (!stripeSubscription) {
			return {
				...error,
				message: 'Error retrieving subscription. Please contact support@helth.app for assistance.'
			};
		}
		let renew = 0;
		if (stripeSubscription.items.data[0].plan.interval === 'year') {
			renew = toUtc(new Date(new Date().setFullYear(new Date().getFullYear() + 1)));
		} else if (stripeSubscription.items.data[0].plan.interval === 'month') {
			// rewew after 1 month
			renew = toUtc(new Date(new Date().setMonth(new Date().getMonth() + 1)));
		}

		// activate account in Dexie Cloud with provided email
		const res = await updateUser(
			{
				userId: email,
				type: 'prod',
				validUntil: new Date(renew).toISOString(),
				data: {
					email: email,
					name: email
				}
			},
			accessToken
		);

		if (!res.ok) {
			return {
				...error,
				message:
					'Something went wrong activating your account. Please contact support@helth.app for assistance.'
			};
		}
		const subscriptionData: Subscription = {
			subscriptionId: session.subscription,
			customerId: session.customer,
			email: email,
			status: 'prod',
			validUntilDate: renew,
			renewalDate: renew
		};

		return { ...success, subscriptionData };
	} else if (url.searchParams.has('cancelled')) {
		// cancelling subscription
		if (!url.searchParams.has('subscriptionId')) {
			return { ...error, message: 'Invalid or missing subscriptionId.' };
		}
		const stripeSubscription = await StripeService.getSubscription(
			url.searchParams.get('subscriptionId') as string
		);

		if (!stripeSubscription) {
			return {
				...error,
				message: 'Error retrieving subscription. Please contact support@helth.app for assistance.'
			};
		}

		const customer = await StripeService.getCustomer(stripeSubscription.customer as string);

		const subscriptionData: Subscription = {
			subscriptionId: stripeSubscription.id,
			customerId: customer?.email ? customer.email : '',
			email: customer?.email ? customer.email : '',
			status: 'cancelled',
			renewalDate: 0
		};

		return { ...cancelled, subscriptionData };
	} else if (url.searchParams.has('error')) {
		return { ...error };
	}
	return {
		status: null
	};
};

const success = {
	status: 'success',
	message: 'Payment successful!'
};
const error = {
	status: 'error',
	message:
		'Whoops! Something went wrong processing your payment. If this issue persists, please contact support@helth.app'
};
const cancelled = {
	status: 'cancelled',
	message:
		'Subscription cancelled. Your data will stop syncing at the end of the current billing cycle.'
};
