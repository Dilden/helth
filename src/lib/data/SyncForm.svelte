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
			<h3 class="text-xl">Account</h3>
			<div class="flex flex-row justify-between">
				<p>Logged in as: {$user.name}</p>
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
									value="price_1RW2BTFNoixNaYid2ndxiKDM"
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
				<p class="bg-emerald-950 p-2">Thanks for supporting helth.app!</p>
				<form method="POST" action="?/cancel" class="flex flex-col gap-4">
					<fieldset class="flex w-auto flex-row justify-center gap-4">
						<button class="w-auto grow-0 bg-rose-600 p-5 text-slate-100 hover:bg-rose-400"
							>Cancel Subscription</button
						>
					</fieldset>
				</form>
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
