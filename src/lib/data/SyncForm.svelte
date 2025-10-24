<script lang="ts">
	import { db } from '$stores/db';
	import { onMount } from 'svelte';
	import { utcToHuman } from '$utils/dates';
	import SubscribeForm from './SubscribeForm.svelte';
	import CancelForm from './CancelForm.svelte';

	interface Props {
		subscription: Subscription;
	}

	let { subscription }: Props = $props();

	onMount(async () => {
		const logins = await db.table('$logins').toArray();
		if (logins.length > 0) {
			await db.cloud.login();
		}
	});

	let user = db.cloud.currentUser;
	let syncState = db.cloud.syncState;
	$inspect($user);
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
					<SubscribeForm />
				</div>
			{:else if $user.license?.type === 'prod'}
				<div class="flex flex-col gap-2">
					<h3 class="text-xl">Subscription</h3>
					<div class="flex flex-row justify-between odd:bg-emerald-950">
						<p>Status</p>
						<p>
							{#if subscription?.status === 'prod'}
								Active 🥰
							{:else if subscription?.status === 'cancelled'}
								Cancelled 😢
							{/if}
						</p>
					</div>
					<div class="flex flex-row justify-between odd:bg-emerald-950">
						{#if $user.license.validUntil}
							<p>Cloud Sync Until</p>
							<p>{utcToHuman($user.license.validUntil.getTime())}</p>
						{/if}
					</div>
					<div class="flex flex-row justify-between odd:bg-emerald-950">
						{#if subscription.renewalDate}
							<p>Billing Renewal Date</p>
							<p>{utcToHuman(subscription.renewalDate)}</p>
						{/if}
					</div>
				</div>
				{#if subscription?.subscriptionId && subscription?.status !== 'cancelled'}
					<!-- Cancel Form -->
					<CancelForm subscriptionId={subscription?.subscriptionId} />
				{:else}
					<SubscribeForm />
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
