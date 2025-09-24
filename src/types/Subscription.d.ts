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
	subscriptionId: string;
	customerId: string;
	email: string;
	subscriptionStatus?: string;
	subscriptionStartDate?: number;
}
