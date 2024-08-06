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

<div class="flex h-full flex-col" data-sveltekit-reload={$updated ? '' : 'off'}>
	<Navigation />
	<div class="flex-auto px-4">
		<slot />
	</div>
	<div class="shrink-0">
		<Footer />
	</div>
</div>
<SvelteToast />

{#await import('$lib/ReloadPrompt.svelte') then { default: ReloadPrompt }}
	<ReloadPrompt />
{/await}
