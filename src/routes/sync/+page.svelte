<script lang="ts">
	import { onMount } from 'svelte';
	import SyncForm from '$lib/data/SyncForm.svelte';
	import { successToast, infoToast, errorToast } from '$utils/toast';
	import { subscription } from '$stores/stores.svelte';
	import { db } from '$stores/db';
	import type { PageProps } from './$types';
	import Spinner from '$lib/Spinner.svelte';

	let { data }: PageProps = $props();
	let { subscriptionData, status, message } = { ...data };

	onMount(async () => {
		if (subscriptionData && subscriptionData != subscription.get()) {
			await subscription.update(subscriptionData.subscriptionId, subscriptionData);
		}

		// force sync
		if (status === 'success') {
			await db.cloud.sync({ wait: true, purpose: 'pull' });
		}
	});

	if (status === 'success') {
		successToast(message);
	} else if (status === 'cancelled') {
		infoToast(message);
	} else if (status === 'error') {
		errorToast(message);
	}
</script>

<div class="p-7">
	{#await subscription.init()}
		<Spinner />
	{:then}
		<SyncForm />
	{/await}
</div>
