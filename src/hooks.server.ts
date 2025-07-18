import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-XSS-Protection', '0');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Strict-Transport-Security', 'text/html; charset=UTF-8');
	response.headers.set('Content-Type', 'text/html; charset=UTF-8');

	// response.headers.set(
	// 	'Content-Security-Policy',
	// 	"default-src 'self'; script-src 'self' static.cloudflareinsights.com;"
	// );

	return response;
};
