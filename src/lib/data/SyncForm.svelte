<script lang="ts">
	import { db } from '$stores/db';

	let user = db.cloud.currentUser;
</script>

<div class="flex flex-col gap-2 p-7 md:flex-row">
	{#if $user.userId !== 'unauthorized'}
		<p>Logged in as: {$user.name}</p>
		<button onclick={async () => db.table('$logins').clear()}>Logout</button>
	{:else}
		<button onclick={async () => db.cloud.login()}>Login</button>
	{/if}
</div>
