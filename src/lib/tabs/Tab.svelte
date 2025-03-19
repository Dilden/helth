<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();

	const tab = {};
	const { registerTab, selectTab, selectedTab } = getContext(TABS);

	registerTab(tab);
</script>

<button class:selected="{$selectedTab === tab}" onclick={() => selectTab(tab)}>
	{@render children?.()}
</button>
<style>
	button {
		background: none;
		border: none;
		border-bottom: 2px solid var(--border-color);
		border-radius: 0;
		margin: 0 var(--universal-margin);
    padding: var(--universal-padding);
		color: var(--secondary-border-color);
	}
	
	.selected {
		border-bottom: 2px solid var(--secondary-border-color);
		color: var(--fore-color);
		background: var(--back-color);
	}
</style>
