<script>
  import Navigation from '$components/Nav/Navigation.svelte';
  import { onMount } from 'svelte'
	import { browser, dev } from '$app/env'

	const loadRPC = !dev && browser
	let ReloadPrompt
	onMount(async () => {
		loadRPC && (ReloadPrompt = (await import('$components/ReloadPrompt.svelte')).default)
	})
</script>

<svelte:head>
	{#if !dev}
		<link rel="manifest" href="/_app/immutable/manifest.webmanifest">
	{/if}
</svelte:head>

<Navigation />

<slot />

{#if ReloadPrompt}
	<svelte:component this={ReloadPrompt} />
{/if}
