import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../sync/$types';
import { StripeService } from '$utils/stripeservice';

export const POST: RequestHandler = async ({ request }) => {
	if (request.headers.get('content-type') !== 'application/json; charset=utf-8') {
		error(405, 'Method not allowed');
	}
	if (!request.headers.get('stripe-signature')) {
		error(401, 'Unauthorized');
	}

	const event = StripeService.verify(
		await request.text(),
		request.headers.get('stripe-signature') || ''
	);

	return json({ received: true });
	// return new Response();
};

export const fallback: RequestHandler = () => {
	error(405, 'Method not allowed');
};
