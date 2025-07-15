<script lang="ts">
	import SyncForm from '$lib/data/SyncForm.svelte';
	import { successToast, infoToast, errorToast } from '$utils/toast';

	interface Props {
		status: string;
		subscription?: Subscription;
		message?: string;
	}

	let { status, subscription, message }: Props = $props();
	if (status === 'success') {
		successToast('Payment successful!');
	} else if (status === 'cancelled') {
		infoToast('Subscription cancelled 😢');
	} else if (status === 'error') {
		errorToast(message);
	}
</script>

<div class="p-7">
	<SyncForm />
</div>
