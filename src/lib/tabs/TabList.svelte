<script>
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<div class="tab-list">
	{@render children?.()}
</div>

<style>
	.tab-list {
		border-bottom: 1px solid teal;
	}
</style>
