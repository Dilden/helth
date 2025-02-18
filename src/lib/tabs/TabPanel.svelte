<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();

	const panel = {};
	const { registerPanel, selectedPanel } = getContext(TABS);

	registerPanel(panel);
</script>

{#if $selectedPanel === panel}
	{@render children?.()}
{/if}
