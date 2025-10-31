<script lang="ts">
	import { confirmDialog } from '$utils/toast';
	import { preventDefault } from 'svelte/legacy';
	interface Props {
		subscriptionId: string;
	}
	let { subscriptionId }: Props = $props();
</script>

<form method="POST" action="?/cancel" class="flex flex-col gap-4">
	<fieldset class="flex w-auto flex-row justify-center gap-4">
		<input
			type="hidden"
			name="subscriptionId"
			value={subscriptionId.startsWith('#') // Dexie Cloud sync requires saving the ID with a # prefix
				? subscriptionId.substring(1)
				: subscriptionId}
		/>
		<button
			class="w-auto grow-0 p-2"
			onsubmit={preventDefault(() =>
				confirmDialog(
					'Are you sure you want to cancel your subscription? Cloud sync will remain active until the end of your current billing cycle',
					() => console.log('yes'),
					() => console.log('no')
				)
			)}>Cancel Subscription</button
		>
	</fieldset>
</form>
