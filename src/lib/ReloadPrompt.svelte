<script>
	import { useRegisterSW } from 'virtual:pwa-register/svelte';

	const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
		onRegistered(swr) {
			// uncomment to poll for updates
			//swr && setInterval(() => {
			//   console.log('Checking for sw update')
			//   swr.update()
			//}, 20000 /* 20s for testing purposes */)
			console.log(`SW registered: ${swr}`);
		},
		onRegisterError(error) {
			console.log('SW registration error', error);
		}
	});

	function close() {
		offlineReady.set(false);
		needRefresh.set(false);
	}

	let toast = $derived($offlineReady || $needRefresh);
</script>

{#if toast}
	<div class="pwa-toast" role="alert">
		<div class="message">
			{#if $offlineReady}
				<span> App ready to work offline </span>
			{:else}
				<span> New content available, click on reload button to update. </span>
			{/if}
		</div>
		{#if $needRefresh}
			<button onclick={() => updateServiceWorker(true)}> Reload </button>
		{/if}
		<button onclick={close}> Close </button>
	</div>
{/if}

<style>
	.pwa-toast {
		position: fixed;
		top: 0;
		margin: 16px;
		padding: 12px;
		border: 1px solid #8885;
		border-radius: 4px;
		z-index: 200;
		text-align: left;
		background-color: var(--back-color);
	}
	.pwa-toast .message {
		margin-bottom: 8px;
	}
	.pwa-toast button {
		border: 1px solid #8885;
		outline: none;
		margin-right: 5px;
		border-radius: 2px;
		padding: 3px 10px;
	}
</style>
