<script lang="ts">
	import { db } from '$stores/db';
	import { onMount } from 'svelte';
	import { utcToHuman } from '$utils/dates';
	import { subscription } from '$stores/stores.svelte';
	import SubscribeForm from './SubscribeForm.svelte';
	import CancelForm from './CancelForm.svelte';

	onMount(async () => {
		const logins = await db.table('$logins').toArray();
		if (logins.length > 0) {
			await db.cloud.login();
		}
	});

	$inspect(subscription.get()?.validUntilDate);
	$inspect(subscription.get()?.renewalDate);
	$inspect(subscription.get()?.status);

	let user = db.cloud.currentUser;
	let syncState = db.cloud.syncState;
</script>

<div class="gap-2 p-4 md:p-7 flex flex-col">
	<h2 class="md:text-left text-center">Cloud Sync</h2>
	{#if $syncState?.error}
		<span class="bg-emerald-950">
			<p>
				An error syncing your data has been encountered. Please contact <a
					href="mailto:support@helth.app">support</a
				> with the following error:
			</p>
			<p>{$syncState.error}</p>
		</span>
	{/if}
	{#if $user.userId != 'unauthorized'}
		<div class="gap-y-5 md:gap-y-0 flex flex-col">
			<div>
				<h3 class="text-xl">Account</h3>
				<div class="md:flex-row flex flex-col justify-between">
					<p>Logged in as: {$user.name ? $user.name : $user.email}</p>
					<button
						class="md:mx-0 md:w-auto mx-auto w-[80%]"
						onclick={async () => db.table('$logins').clear()}>Logout</button
					>
				</div>
			</div>
			{#if $user.license?.type === 'eval'}
				<!-- Trial -->
				<h3 class="text-xl">Subscription</h3>
				<div class="md:flex-row flex flex-col items-center justify-between">
					{#if $user.license.evalDaysLeft && $user.license?.evalDaysLeft > 0}
						<p class="bg-emerald-950 p-2">
							Trial has {$user.license.evalDaysLeft} days remaining
						</p>
					{:else}
						<p class="bg-emerald-950 p-2">
							Trial period expired! Please purchase a subscription to use cloud sync features.
						</p>
					{/if}
					<SubscribeForm />
				</div>
			{:else if $user.license?.type === 'prod'}
				<!-- Existing Acct -->
				<div class="gap-2 flex flex-col">
					<h3 class="text-xl">Subscription</h3>
					<div class="odd:bg-emerald-950 flex flex-row justify-between">
						<p>Status</p>
						<p>
							{#if $user.license.status === 'ok' && subscription.get()?.status === 'prod'}
								Active 🥰
							{:else}
								Subcription expired or deactivated 😢
							{/if}
						</p>
					</div>
					{#if subscription.get()?.validUntilDate}
						<div class="odd:bg-emerald-950 flex flex-row justify-between">
							<p>Cloud Sync Active Until</p>
							<p>
								{utcToHuman(subscription.get()?.validUntilDate ?? 0)}
							</p>
						</div>
					{/if}
					{#if subscription.get()?.renewalDate && subscription.get()?.status != 'cancelled'}
						<div class="odd:bg-emerald-950 flex flex-row justify-between">
							<p>Billing Renewal Date</p>
							<p>{utcToHuman(subscription.get()?.renewalDate ?? 0)}</p>
						</div>
					{/if}
				</div>
				<div class="my-3 mx-auto w-auto">
					{#key subscription.get()?.status}
						{#if subscription.get()?.subscriptionId && subscription.get()?.status !== 'cancelled'}
							<CancelForm subscriptionId={subscription.get()?.subscriptionId} />
						{:else}
							<SubscribeForm />
						{/if}
					{/key}
				</div>
			{/if}
		</div>
	{:else}
		<div class="flex flex-row justify-around">
			<div></div>
			<div class="text-center">
				<p>Sign in with a valid email to begin syncing data</p>
				<button
					onclick={async () =>
						await db.cloud.login().then(async () => {
							return await db.cloud.sync({ wait: true, purpose: 'pull' });
						})}>Login</button
				>
			</div>
			<div></div>
		</div>
	{/if}
</div>
