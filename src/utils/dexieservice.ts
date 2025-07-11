import { PUBLIC_DB_URL } from '$env/static/public';
import { PRIVATE_SECRET, PRIVATE_ID } from '$env/static/private';

export const getToken = async () => {
	return await fetch(PUBLIC_DB_URL + '/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({
			grant_type: 'client_credentials',
			scopes: ['GLOBAL_READ', 'ACCESS_DB'],
			client_id: PRIVATE_ID,
			client_secret: PRIVATE_SECRET
		})
	}).then((r) => r.json());
};

export const getCloudUserById = async (id: string) => {
	const token = await getToken();
	return await fetch(PUBLIC_DB_URL + `/users/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': token.accessToken
		}
	}).then((r) => r.json());
};
