<script lang="ts">
	import { db } from '$stores/db';

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
	{#if $user.userId !== 'unauthorized'}
		<div class="flex flex-col">
			<p>Logged in as: {$user.name}</p>
			{#if $user.license?.type === 'eval'}
				{#if $user.license.evalDaysLeft && $user.license?.evalDaysLeft > 0}
					<p class="bg-emerald-950 p-2">Trial has {$user.license.evalDaysLeft} days remaining</p>
				{:else}
					<p class="bg-emerald-950 p-2">
						Trial period expired! Please purchase a subscription to use cloud sync features.
					</p>
				{/if}
				<a target="_blank" href="https://buy.stripe.com/5kQfZh0x037a28zfuJ83C07">$1 monthly</a>
				<a target="_blank" href="https://buy.stripe.com/9B69ATgvY5fi7sT6Yd83C06">$10 annually</a>
			{:else if $user.license?.type === 'prod'}
				<p class="bg-emerald-950 p-2">Thanks for supporting helth.app!</p>
			{/if}
		</div>
		<button onclick={async () => db.table('$logins').clear()}>Logout</button>
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
