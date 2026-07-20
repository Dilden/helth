<script lang="ts">
	import Item from '../inventory/Item.svelte';
	import AddItem from '$lib/inventory/AddItem.svelte';
	import Spinner from '$lib/Spinner.svelte';
	import Search from '$lib/misc/Search.svelte';
	import { recipes, recipeSearch, recipeSearchResults, inventory } from '$stores/stores.svelte';
	import RecipeForm from './RecipeForm.svelte';
	import RecipeItem from './RecipeItem.svelte';
</script>

<div class="md:grid-cols-2 grid grid-cols-1 grid-rows-[1fr_auto]">
	<h3 class="md:col-end-2 col-start-1 col-end-3">Inventory & Recipes</h3>
	<div class="m-2 mt-0 md:col-start-2 md:col-end-3 relative col-start-1 col-end-2">
		<Search bind:searchStoreVal={recipeSearch.query} searchTitle="Search Recipes" />
	</div>
</div>
