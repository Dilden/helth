import { error } from '@sveltejs/kit';
import type { RequestHandler } from '../sync/$types';

export const POST: RequestHandler = ({ request }) => {
	if (request.headers.get('content-type') !== 'application/json') {
		error(405, 'Method not allowed');
	}
	if (request.headers.get('stripe-signature') !== 'hasValue') {
		error(401, 'Unauthorized');
	}
	return new Response();
};

export const fallback: RequestHandler = () => {
	error(405, 'Method not allowed');
};
