interface CloudUser {
	userId: string;
	type: 'eval' | 'prod';
	deactivated?: boolean;
	data?: {
		email: string;
		name: string;
	};
	validUntil: string;
}

interface Subscription {
	subscriptionId: string;
	customerId: string;
	email: string;
	renewalDate?: number; // Stripe - payment renewal
	validUntilDate?: number; // Dexie Cloud valid limit
	status?: 'prod' | 'eval' | 'cancelled';
	startDate?: number;
}
