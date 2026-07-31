<script lang="ts">
	import Spinner from '$lib/Spinner.svelte';
	import Search from '$lib/misc/Search.svelte';
	import { q, searchResults, inventory } from '$stores/stores.svelte';
	import Item from '../inventory/Item.svelte';
	import RecipeItem from './RecipeItem.svelte';
	import AddItem from '$lib/inventory/AddItem.svelte';
	import RecipeForm from './RecipeForm.svelte';
</script>

<div class="md:grid-cols-2 grid grid-cols-1 grid-rows-[1fr_auto]">
	<h3 class="md:col-end-2 col-start-1 col-end-3">Inventory & Recipes</h3>
	<div class="m-2 mt-0 md:col-start-2 md:col-end-3 relative col-start-1 col-end-2">
		<Search bind:searchStoreVal={q.query} searchTitle="Search" />
	</div>

	<ul class="mb-8 p-0 md:col-end-3 col-start-1 col-end-2 list-none">
		<!-- TODO  -->
		<!-- searchResults() or searchResults().results?? which is correct?? -->
		{#await searchResults()}
			<Spinner />
		{:then { results }}
			{#each results as x}
				{#if 'items' in x}
					<RecipeItem recipe={x} />
				{:else if 'nutrients' in x}
					<Item item={x} />
				{:else}
					<p>Unknown Item type</p>
				{/if}
			{/each}
		{/await}
	</ul>
</div>
