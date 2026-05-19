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
	class="gap-4 flex flex-col"
>
	<fieldset class="gap-4 flex w-auto flex-row justify-center">
		<input
			type="hidden"
			name="subscriptionId"
			value={subscriptionId.startsWith('#') // Dexie Cloud sync requires saving the ID with a # prefix
				? subscriptionId.substring(1)
				: subscriptionId}
		/>
		<button class="p-2 w-auto grow-0">Cancel Subscription</button>
	</fieldset>
</form>
