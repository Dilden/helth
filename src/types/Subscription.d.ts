interface CloudUser {
	userId: string;
	type: 'eval' | 'prod';
	deactivated?: boolean;
	data?: {
		email: string;
		name: string;
	};
}

interface Subscription {
	id: string;
	email: string;
	customerId: string;
	subscriptionStatus: string;
	subscriptionId: string;
	subscriptionStartDate: number;
}
