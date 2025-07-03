<script lang="ts">
	import { db } from '$stores/db';

	let user = db.cloud.currentUser;
	let syncState = db.cloud.syncState;
</script>

<div class="flex flex-col gap-2 p-7">
	{#if $syncState}
		<pre>{JSON.stringify($syncState)}</pre>
	{/if}
	{#if $user.userId !== 'unauthorized'}
		<div class="flex flex-col">
			<p>Logged in as: {$user.name}</p>
			{#if $user.license?.type === 'eval'}
				<p class="bg-emerald-950 p-2">Trial has {$user.license.evalDaysLeft} days remaining</p>
				<a href="https://buy.stripe.com/5kQfZh0x037a28zfuJ83C07">$1 monthly</a>
				<a href="https://buy.stripe.com/9B69ATgvY5fi7sT6Yd83C06">$10 annually</a>
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
