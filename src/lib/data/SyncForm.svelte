<script lang="ts">
	import { db } from '$stores/db';
	import { onMount } from 'svelte';
	import { utcToHuman } from '$utils/dates';

	interface Props {
		subscriptionId?: string;
		renewalDate?: number;
		status?: string;
	}

	let { subscriptionId, renewalDate, status }: Props = $props();

	onMount(async () => {
		const logins = await db.table('$logins').toArray();
		if (logins.length > 0) {
			await db.cloud.login();
		}
	});

	let user = db.cloud.currentUser;
	let syncState = db.cloud.syncState;
</script>

<div class="flex flex-col gap-2 p-7">
	{#if $syncState.error}
		<p>
			An error syncing your data has been encountered. Please contact <a
				href="mailto:support@helth.app">support</a
			>.
		</p>
	{/if}
	{#if $user.userId != 'unauthorized'}
		<div class="flex flex-col">
			<h3 class="text-xl">Account</h3>
			<div class="flex flex-row justify-between">
				<p>Logged in as: {$user.name ? $user.name : $user.email}</p>
				<button onclick={async () => db.table('$logins').clear()}>Logout</button>
			</div>
			{#if $user.license?.type === 'eval'}
				<h3 class="text-xl">Subscription</h3>
				<div class="flex flex-row items-center justify-between">
					{#if $user.license.evalDaysLeft && $user.license?.evalDaysLeft > 0}
						<p class="bg-emerald-950 p-2">Trial has {$user.license.evalDaysLeft} days remaining</p>
					{:else}
						<p class="bg-emerald-950 p-2">
							Trial period expired! Please purchase a subscription to use cloud sync features.
						</p>
					{/if}
					<form method="POST" action="?/subscribe" class="flex flex-col gap-4">
						<fieldset class="flex w-auto flex-row justify-center gap-4">
							<div>
								<input
									type="radio"
									id="monthly"
									name="subscription"
									required
									value="price_1RjPaSFMCuO7ieQRwVIt9aWt"
								/>
								<label for="monthly" class="p-2 text-xl">$1/month</label>
							</div>
							<div>
								<input
									type="radio"
									id="annually"
									checked
									name="subscription"
									required
									value="price_1RjPaSFMCuO7ieQRf3E5RX02"
								/>
								<label for="annually" class="text-xl">$10/year</label>
							</div>
						</fieldset>
						<button class="w-auto grow-0 p-5">Subscribe</button>
					</form>
				</div>
			{:else if $user.license?.type === 'prod'}
				<p class="bg-emerald-950 p-2">
					Your cloud sync subscription
					{#if status === 'prod'}
						is active
					{:else if status === 'cancelled'}
						has been cancelled
					{:else if status === 'eval'}
						is in trial mode
					{/if}
					{#if renewalDate}
						and valid until {utcToHuman(renewalDate)}
					{/if}. Thanks for supporting helth.app!
				</p>
				{#if subscriptionId}
					<form method="POST" action="?/cancel" class="flex flex-col gap-4">
						<fieldset class="flex w-auto flex-row justify-center gap-4">
							<input
								type="hidden"
								name="subscriptionId"
								value={subscriptionId.startsWith('#') // Dexie Cloud sync requires saving the ID with a # prefix
									? subscriptionId.substring(1)
									: subscriptionId}
							/>
							<button class="w-auto grow-0 p-2">Cancel Subscription</button>
						</fieldset>
					</form>
				{:else}
					<p>
						Whoops! Your subscription wasn't found. Please contact support@helth.app if you would
						like to cancel your subscription.
					</p>
				{/if}
			{/if}
		</div>
	{:else}
		<p>Not logged in</p>
		<button
			onclick={async () =>
				await db.cloud.login().then(async () => {
					return await db.cloud.sync({ wait: true, purpose: 'pull' });
				})}>Login</button
		>
	{/if}
</div>
