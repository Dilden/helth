interface CloudUser {
	userId: string;
	type: 'eval' | 'prod';
	deactivated?: boolean;
	data?: {
		email: string;
		name: string;
	};
	validUntil?: string | null;
	evalDaysLeft?: number | null;
}

interface Subscription {
	subscriptionId: string;
	customerId: string;
	email: string;
	renewalDate?: number | null; // Stripe - payment renewal
	validUntilDate?: number | null; // Dexie Cloud valid limit
	status?: 'prod' | 'eval' | 'cancelled';
	startDate?: number;
}
