<script lang="ts">
	import NutrientItem from './NutrientItem.svelte';

	/** @type {{list: Array<Nutrient>}} */
	let { list } = $props();
</script>

<ul class="sm:pl-0 text-center list-none" role="list">
	{#each list as nutrient}
		{#if nutrient.quantity > 0}
			<NutrientItem {nutrient} />
		{/if}
	{/each}
</ul>
