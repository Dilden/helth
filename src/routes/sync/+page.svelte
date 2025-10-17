<script lang="ts">
	import { onMount } from 'svelte';
	import SyncForm from '$lib/data/SyncForm.svelte';
	import { successToast, infoToast, errorToast } from '$utils/toast';
	import { getSubscription, saveSubscription } from '$stores/db';
	import { db } from '$stores/db';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let { subscription, status, message } = { ...data };

	let sub = $state([subscription]);
	$inspect(sub);

	onMount(async () => {
		sub = await getSubscription();
		if (subscription) {
			if (sub.length <= 0) {
				await saveSubscription(subscription).then((re) => console.log(re));
			} else if (sub.length === 1) {
				// TODO: update subscription with new info
				// subscription ID doesn't match yet and so won't overwrite
				sub[0] = { ...subscription };
				await saveSubscription(sub[0]).then((re) => console.log(re));
			}
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
	<SyncForm
		subscriptionId={sub[0]?.subscriptionId}
		renewalDate={sub[0]?.renewalDate}
		status={sub[0]?.status}
	/>
</div>
