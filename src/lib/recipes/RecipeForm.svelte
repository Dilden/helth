<script>
	import { recipes, inventoryFilter } from '$stores/stores.js';
	import { formatRecipeFormValues } from '$utils/formValues';
	import Search from '$lib/misc/Search.svelte';

	export let recipe = {};
	export let inventoryItems = [];
	export let submitCallback = () => false;

	let validated = true;

	const handleSubmit = (event) => {
		const vals = formatRecipeFormValues(event.target);
		if (vals?.items?.length) {
			$recipes = vals;
			event.target.reset();
			submitCallback();
			validated = true;
		} else {
			validated = false;
		}
	};
</script>

<form
	class="grid-rows-[1fr 1fr auto 1fr] md:grid-rows-[1fr auto 1fr] m-4 grid grid-cols-1 md:grid-cols-8"
	name="AddRecipe"
	on:submit|preventDefault={handleSubmit}
>
	{#if recipe.id}
		<input type="hidden" id="id" name="id" value={recipe.id} />
	{/if}

	<span class="col-start-1 col-end-2 md:col-start-2 md:col-end-5">
		<label class="mx-auto my-2 block w-11/12" for="recipeName">Recipe Name</label>
		<input
			class="mx-auto my-2 block w-11/12"
			type="text"
			id="recipeName"
			name="name"
			required
			value={recipe.name ? recipe.name : ''}
		/>
	</span>

	<span class="col-start-1 col-end-2 md:col-start-5 md:col-end-8">
		<label class="mx-auto my-2 block w-11/12" for="recipeDescription">Recipe Description</label>
		<input
			class="mx-auto my-2 block w-11/12"
			type="text"
			id="recipeDescription"
			name="description"
			value={recipe.description ? recipe.description : ''}
			required
		/>
	</span>

	<div
		class="inventory col-start-1 col-end-2 row-auto mb-4 grid gap-2 overflow-scroll md:col-start-2 md:col-end-8"
	>
		<div class="col-start-1 col-end-8 my-2 mx-8">
			<!-- $inventoryFilter is used later on to hide items so users can filter large inventories quickly -->
			<Search
				searchTitle="Filter inventory"
				scrollTo={false}
				bind:searchStoreVal={$inventoryFilter}
			/>
		</div>
		{#if inventoryItems?.length}
			{#if !validated}
				<div class="col-start-1 col-end-7 block w-full bg-[#794949] p-2">
					At least one item must be selected!
				</div>
			{/if}
      <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 content-center gap-2 items-center justify-evenly col-start-1 col-end-8">
        {#each inventoryItems as item}
          <!-- hide items here based on $inventoryFilter value as removing them entirely breaks the form -->
          <span
            class="grid grid-cols-7 content-center items-center justify-evenly justify-self-auto {item.name
            .toLowerCase()
            .includes($inventoryFilter.toLowerCase())
            ? 'block'
            : 'hidden'}"
          >
            <input
              id="inventoryItem-{item.id}"
              type="checkbox"
              class="col-span-1 m-0 p-4"
              value={item.id}
              name={item.name}
              checked={recipe.items && recipe.items.map((item) => item.id).includes(item.id)
                ? true
                : false}
            />
            <label class="col-span-6 m-0 ml-2" for="inventoryItem-{item.id}">
              {item.name}
            </label>
          </span>
        {/each}
      </div>
		{:else}
			<p>
				No items found in inventory! Go scan something or Add an Item to your Inventory manually
				before creating a recipe.
			</p>
		{/if}
	</div>
	<input
		type="submit"
		class="col-start-1 col-end-2 md:col-start-3 md:col-end-7"
		value={recipe.id ? 'Update' : 'Save'}
	/>
</form>
