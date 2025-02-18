<script>
	import '../app.css';
	import Navigation from '$lib/nav/Navigation.svelte';
	import Spinner from '$lib/Spinner.svelte';
	import Footer from '$lib/nav/Footer.svelte';
	import { persist, isStoragePersisted, dbopen } from '$stores/db';
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	import SvelteToast from '$lib/toast/SvelteToast.svelte';
	import { confirmDialog } from '$utils/toast.js';
	import { updated } from '$app/stores';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();

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

	let webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<div class="flex h-full flex-col" data-sveltekit-reload={$updated ? '' : 'off'}>
	<Navigation />
	<div class="flex-auto px-4">
		{#await dbopen}
			<Spinner />
		{:then}
			{@render children?.()}
		{/await}
	</div>
	<div class="shrink-0">
		<Footer />
	</div>
</div>
<SvelteToast />

{#await import('$lib/ReloadPrompt.svelte') then { default: ReloadPrompt }}
	<ReloadPrompt />
{/await}
