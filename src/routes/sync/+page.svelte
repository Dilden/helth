<script lang="ts">
	import type { PageProps } from './$types';
	import SyncForm from '$lib/data/SyncForm.svelte';
	import { successToast, infoToast, errorToast } from '$utils/toast';

	let { data }: PageProps = $props();
	if (data?.status === 'success') {
		successToast('Payment successful!');
	} else if (data?.status === 'cancelled') {
		infoToast('Subscription cancelled 😢');
	} else if (data?.status === 'error') {
		errorToast(data?.message);
	}
</script>

<div class="p-7">
	<SyncForm />
</div>
