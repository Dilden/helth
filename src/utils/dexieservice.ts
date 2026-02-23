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
			scopes: ['GLOBAL_READ', 'GLOBAL_WRITE', 'ACCESS_DB'],
			client_id: PRIVATE_ID,
			client_secret: PRIVATE_SECRET
		})
	});
};

export const getCloudUserById = async (id: string, token: string) => {
	try {
		return await fetch(PUBLIC_DB_URL + `/users/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		});
	} catch (e: any) {
		if (e == typeof Error) {
			console.log(e.message);
		}
	}
};

export const updateUser = async (User: CloudUser, token: string) => {
	return await fetch(PUBLIC_DB_URL + '/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		},
		body: JSON.stringify([User])
	});
};

export const updateCloudSubscription = async (subscription: Subscription, token: string, realmId: string) => {
	const data = {
		...subscription,
		realmId: realmId
	}
	return await fetch(PUBLIC_DB_URL + '/all/subscription', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		},
		body: JSON.stringify([data])
	});
}
