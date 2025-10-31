<script lang="ts">
	import { onMount } from 'svelte';
	import SyncForm from '$lib/data/SyncForm.svelte';
	import { successToast, infoToast, errorToast } from '$utils/toast';
	// import { getSubscription, saveSubscription } from '$stores/db';
	import { subscription } from '$stores/stores.svelte';
	import { db } from '$stores/db';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let { subscriptionData, status, message } = { ...data };

	onMount(async () => {
		await subscription.init();
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
	<SyncForm subscription={subscription.get()} />
</div>
