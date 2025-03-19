<script lang="ts">
	import { toast } from '$stores/toaststore';

	type callbackFn = () => boolean;

	interface Props {
		message?: string;
		callbackConfirm?: callbackFn;
		callbackDeny?: callbackFn;
	}

	let { message = '', callbackConfirm = () => true, callbackDeny = () => false }: Props = $props();

	const yes = () => {
		toast.pop(); // removes all toasts
		callbackConfirm();
	};
	const no = () => {
		toast.pop(); // removes all toasts
		callbackDeny();
	};
</script>

<div class="grid-col-2 grid-rows-[1fr .5fr] grid gap-x-5">
	<p class="col-start-1 col-end-3">{message}</p>
	<button class="col-start-1 col-end-1 text-2xl" title="Yes" onclick={yes}>Yes</button>
	<button class="col-start-2 col-end-2 text-2xl" title="No" onclick={no}>No</button>
</div>
