<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import SyncForm from '$lib/data/SyncForm.svelte';
	import { successToast, infoToast, errorToast } from '$utils/toast';
	import { subscription } from '$stores/stores.svelte';
	import { db } from '$stores/db';
	import type { PageData } from './$types';
	import Spinner from '$lib/Spinner.svelte';

	let { data }: { data: PageData } = $props();
	// svelte-ignore state_referenced_locally
	let { status, message } = { ...data };

	onMount(async () => {
		// force sync
		if (status === 'success') {
			await db.cloud.sync({ wait: true, purpose: 'pull' });
		}
	});
	let user = db.cloud.currentUser;

	if (status === 'success') {
		successToast(message);
		setTimeout(() => goto('/sync'), 5000);
	} else if (status === 'cancelled') {
		infoToast(message);
		setTimeout(() => goto('/sync'), 5000);
	} else if (status === 'error') {
		errorToast(message);
	}
</script>

<div class="p-3 md:p-7">
	{#await subscription.init()}
		<Spinner />
	{:then}
		{#key $user?.license?.type || $user?.license?.status || subscription.get()?.status}
			<SyncForm />
		{/key}
	{/await}
</div>
