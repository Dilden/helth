<script lang="ts">
	import { confirmDialog, infoToast } from '$utils/toast';
	interface Props {
		subscriptionId: string;
	}
	let { subscriptionId }: Props = $props();

	let submitCount = 0;

	const cancelConfirm = (form: EventTarget | null) => {
		if (form) {
			submitCount++;
			form.dispatchEvent(new SubmitEvent('submit'));
		}
	};
</script>

<form
	name="cancelForm"
	method="POST"
	action="?/cancel"
	onsubmit={(event) => {
		event.preventDefault();
		if (submitCount < 1) {
			confirmDialog(
				'Are you sure you want to cancel your subscription? Cloud sync will remain active until the end of your current billing cycle.',
				() => cancelConfirm(event.target),
				() => infoToast("Okay, we'll keep your subscription active!")
			);
		}
	}}
	class="flex flex-col gap-4"
>
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
