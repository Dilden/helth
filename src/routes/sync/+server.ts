import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../sync/$types';
import { StripeService } from '$utils/stripeservice';
import { Stripe } from 'stripe';
import {
	getToken,
	updateUser,
	updateCloudSubscription,
	getCloudUserById,
	getCloudSubscription
} from '$utils/dexieservice';

export const POST: RequestHandler = async ({ request }) => {
	if (request.headers.get('content-type') !== 'application/json; charset=utf-8') {
		error(405, 'Method not allowed');
	}
	if (!request.headers.get('stripe-signature')) {
		error(401, 'Unauthorized');
	}

	// ensure request came from Stripe
	// fail if it did not
	const event = StripeService.verify(
		await request.text(),
		request.headers.get('stripe-signature') || ''
	);
	if (!event || !(event.type ?? '')) {
		return json({ received: false });
	}

	// we only care about events related to subscription change or deletion for now
	if (!['customer.subscription.deleted', 'customer.subscription.updated'].includes(event.type)) {
		console.log('ignore these events for now');
		return json({ received: true });
	}
	console.log(event);

	// get the customer
	// fail if no customer is found for this subscription
	if (event.data.object.object != 'subscription') {
		console.log('wrong event type');
		return json({ received: true });
	}

	const subscription = event.data.object;
	console.log(subscription);
	let customer: Stripe.Customer | undefined = await StripeService.getCustomer(
		event.data.object?.customer as string
	);
	if (!customer || !customer?.email) {
		console.log('customer not found');
		return json({ received: false });
	}

	const cloudAction: CloudUser = {
		userId: customer.email,
		type: 'prod',
		evalDaysLeft: null
	};

	const subscriptionData: Subscription = {
		subscriptionId: subscription.id,
		customerId: customer.email,
		email: customer.email
	};

	if (
		subscription.status === 'canceled' ||
		(subscription.status === 'active' && subscription?.cancel_at_period_end === true)
	) {
		// manually cancelled or expired
		// multiply Stripe's dates by 1000
		// for more info see https://stackoverflow.com/questions/71443757/how-to-get-stripe-subscription-current-period-end-as-date
		cloudAction.validUntil = subscription.cancel_at
			? new Date(subscription.cancel_at * 1000).toISOString()
			: null;
		subscriptionData.status = 'cancelled';
		subscriptionData.renewalDate = undefined;
		subscriptionData.validUntilDate = subscription.cancel_at ? subscription.cancel_at * 1000 : null;
	} else if (subscription.status === 'active' && subscription.cancel_at_period_end === false) {
		// renew the subscription
		const subData = subscription.items.data[0];
		const nextRenew = subData.current_period_end * 1000;
		cloudAction.validUntil = new Date(nextRenew).toISOString();
		subscriptionData.status = 'prod';
		subscriptionData.renewalDate = nextRenew;
		subscriptionData.validUntilDate = nextRenew;
	}

	// get Dexie Cloud token
	const token = await getToken();
	if (!token.ok) {
		return json({ received: false });
	}
	const { accessToken } = await token.json();

	// special precautions to take when deleting a sub
	if (event.type == 'customer.subscription.deleted') {
		// get existing user license
		const res0 = await getCloudUserById(customer.email, accessToken);
		if (!res0.ok) {
			return json({ received: true });
		}
		const existingUser = (await res0.json()) as CloudUser;
		console.log(existingUser);
		cloudAction.validUntil = existingUser.validUntil ?? cloudAction.validUntil;
		subscriptionData.validUntilDate = new Date(cloudAction.validUntil as string).getTime();
	}

	// update user license
	const res = await updateUser(cloudAction, accessToken);
	if (!res.ok) {
		console.log(await res.text());
		console.log('updateUser fail');
		return json({ received: true });
	}

	// update subscription data for user as well
	const res2 = await updateCloudSubscription(subscriptionData, accessToken, customer.email);
	if (!res2.ok) {
		console.log(await res2.text());
		console.log('update subscription data fail');
		return json({ received: true });
	}

	console.log('Dexie cloud record updated!');
	return json({ received: true });
};

export const fallback: RequestHandler = () => {
	error(405, 'Method not allowed');
};
