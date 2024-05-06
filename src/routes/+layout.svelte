<script>
	import '../app.css';
	import Navigation from '$lib/nav/Navigation.svelte';
	import Footer from '$lib/nav/Footer.svelte';
	import { persist, isStoragePersisted } from '$stores/db';
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { confirmDialog } from '$utils/toast.js';
	import { updated } from '$app/stores';

	onMount(async () => {
		const status = await isStoragePersisted();
		if (!status) {
			confirmDialog(
				"Don't lose your data! Make storage persistent now?",
				persist,
				() => console.log('denied'),
				true
			);
		}
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<div class="main" data-sveltekit-reload={$updated ? '' : 'off'}>
	<Navigation />
	<div class="content">
		<slot />
	</div>
	<div class="footer">
		<Footer />
	</div>
</div>
<SvelteToast />

{#await import('$lib/ReloadPrompt.svelte') then { default: ReloadPrompt }}
	<ReloadPrompt />
{/await}

<style>
	.main {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.content {
		flex: 1 0 auto;
		padding: 0 15px;
	}
	.footer {
		flex-shrink: 0;
	}
</style>
