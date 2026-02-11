import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../sync/$types';
import { StripeService } from '$utils/stripeservice';
import { Stripe } from 'stripe';
import { getToken, updateUser } from '$utils/dexieservice';

export const POST: RequestHandler = async ({ request }) => {
	if (request.headers.get('content-type') !== 'application/json; charset=utf-8') {
		error(405, 'Method not allowed');
	}
	if (!request.headers.get('stripe-signature')) {
		error(401, 'Unauthorized');
	}

	// ensure request came from Stripe
	const event = StripeService.verify(
		await request.text(),
		request.headers.get('stripe-signature') || ''
	);

	// fail if it did not
	if (!event) {
		return json({ received: false });
	}

	if (event.type !== ('customer.subscription.deleted' || 'invoice.payment_failed')) {
		console.log('ignore these events for now');
		return json({ received: true });
	}

	let customer: Stripe.Customer | undefined = await StripeService.getCustomer(
		event.data.object?.customer as string
	);
	let cloudAction: CloudUser = {
		userId: '',
		type: 'prod'
	};

	if (!customer) {
		console.log('customer not found');
		return json({ received: false });
	}

	// set email
	cloudAction.userId = customer.email || '';

	// action to take in Cloud
	switch (event?.type) {
		// events to cancel Cloud Sync
		case 'customer.subscription.deleted':
			cloudAction.deactivated = true;
			break;
		// add Cloud Sync
		// case 'customer.subscription.updated':
		// case 'customer.subscription.resumed':
		// 	customer = await StripeService.getCustomer(event.data.object?.customer as string);
		// cloudUserEdit = {
		// 	userId: customer?.email || '',
		// 	type: 'prod',
		// 	validUntil: new Date(event.data.object.plan[0]).toISOString(),
		// 	data: {
		// 		email: customer?.email || '',
		// 		name: customer?.email || ''
		// 	}
		// }
		// break;
		// alert user to upcoming payment
		// case 'invoice.upcoming':
		// 	break;
		// // send user link to invoice/customer portal?
		// case 'invoice.created':
		// 	break;
		default:
			break;
	}

	// get Dexie Cloud token
	const token = await getToken();
	if (!token.ok) {
		return json({ received: false });
	}
	const { accessToken } = await token.json();

	console.log(cloudAction);
	const res = await updateUser(cloudAction, accessToken);
	console.log(res.status);

	if (!res.ok) {
		console.log('Something went wrong with updating the cloud record');
		return json({ received: true });
	}

	console.log('Dexie cloud record updated!');
	return json({ received: true });
};

export const fallback: RequestHandler = () => {
	error(405, 'Method not allowed');
};
