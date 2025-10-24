<script lang="ts">
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
		<button class="w-auto grow-0 p-2">Cancel Subscription</button>
	</fieldset>
</form>
