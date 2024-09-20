<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast';

	export let message = '';
	export let callbackConfirm = () => true;
	export let callbackDeny = () => false;

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
	<button class="col-start-1 col-end-1 text-2xl" title="Yes" on:click={yes}>Yes</button>
	<button class="col-start-2 col-end-2 text-2xl" title="No" on:click={no}>No</button>
</div>
