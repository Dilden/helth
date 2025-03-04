<script>
	import { preventDefault } from 'svelte/legacy';

	import { recipes, recipeSearch, recipeSearchResults, inventory } from '$stores/stores.svelte';
	import RecipeForm from './RecipeForm.svelte';
	import RecipeItem from './RecipeItem.svelte';
	import Search from '$lib/misc/Search.svelte';
	import { successToast } from '$utils/toast.js';
	import { onMount } from 'svelte';

	let showAddForm = $state(false);
	let editing = $state(undefined);
	$inspect(editing);

	let sortedInventory = $derived(
		inventory.get().toSorted(
			(a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()) // sort inventory alphabetically
		)
	);

	onMount(async () => {
		await recipes.init();
		await inventory.init();
	});

	const editItem = (recipe) => {
		showAddForm = false;
		editing = recipe;
	};
	const duplicateItem = async (recipe) => {
		const { id, created, ...rest } = recipe;
		await recipes.add(rest);
		successToast(`Duplicated ${rest.name}!`);
	};

	const closeEdit = async (id) => {
		await Promise.all(recipeSearchResults().results);
		let top = document.getElementById(id);
		top.scrollIntoView({ behavior: 'smooth' });
		editing = undefined;
	};
</script>

<button
	class="m-4"
	onclick={preventDefault(() => {
		showAddForm = !showAddForm;
		editing = undefined;
	})}>{!showAddForm ? 'Add Recipe' : 'Cancel'}</button
>

{#if showAddForm}
	<RecipeForm
		inventoryItems={sortedInventory}
		submitCallback={() => {
			showAddForm = false;
		}}
	/>
{/if}

<div class="grid grid-cols-1 grid-rows-[1fr_auto] md:grid-cols-2">
	<h3 class="col-start-1 col-end-3 md:col-end-2">Recipes</h3>
	<div class="relative col-start-1 col-end-2 m-2 mt-0 md:col-start-2 md:col-end-3">
		<Search bind:searchStoreVal={recipeSearch.query} searchTitle="Search Recipes" />
	</div>
	<ul class="col-start-1 col-end-2 mb-8 list-none p-0 md:col-end-3">
		{#await Promise.all(recipeSearchResults().results) then formatted}
			{#each formatted.slice().reverse() as recipe, index}
				<li class="m-3 p-2 odd:bg-[#1f2a2d] md:p-4" id="listitem-recipe-{recipe.id}">
					{#if editing?.id === recipe.id}
						<RecipeForm
							{recipe}
							inventoryItems={sortedInventory}
							submitCallback={() => closeEdit(`listitem-recipe-${recipe.id}`)}
						/>
						<!-- rerender is preventing smooth scroll here -->
						<button
							onclick={preventDefault(() => closeEdit(`listitem-recipe-${recipe.id}`))}
							title="Cancel"
							class="mx-1 sm:mx-2"
						>
							Cancel
						</button>
					{:else}
						<RecipeItem {recipe} />
						<button
							onclick={preventDefault(() => editItem(recipe))}
							title="Edit Recipe"
							class="mx-2">✏️</button
						>
						<!-- edit  -->
						<button
							onclick={preventDefault(() => duplicateItem(recipe))}
							title="Duplicate Recipe"
							class="mx-1 sm:mx-2">⏩</button
						>
					{/if}
				</li>
			{/each}
		{/await}
	</ul>
</div>
