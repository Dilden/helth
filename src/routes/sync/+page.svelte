<script lang="ts">
	import type { PageProps } from './$types';
	import SyncForm from '$lib/data/SyncForm.svelte';
	import { successToast, infoToast, errorToast } from '$utils/toast';

	let { data }: PageProps = $props();
	if (data?.payment?.status === 'success') {
		successToast('Payment successful!');
	} else if (data?.payment?.status === 'cancelled') {
		infoToast('Subscription cancelled 😢');
	} else if (data?.payment?.status === 'error') {
		errorToast(
			'Whoops! Something went wrong processing your payment. If this issue persists, please contact support@helth.app'
		);
	}
</script>

<div class="p-7">
	<SyncForm />
</div>
