<script>
	import { preventDefault } from 'svelte/legacy';
	import { blur } from 'svelte/transition';
	import { recipes, recipesInventoryFilter } from '$stores/stores.svelte';
	import { formatRecipeFormValues } from '$utils/formValues';
	import Search from '$lib/misc/Search.svelte';

	/** @type {{recipe?: any, inventoryItems?: any, submitCallback?: any}} */
	let { recipe = {}, inventoryItems = [], submitCallback = () => false } = $props();

	let validated = $state(true);

	// inventoryItems isn't reactive when it comes in but we can make it reactive...
	let reactiveItems = $derived(
		inventoryItems.map((item) => {
			// need to set whether an item should be checked in the list
			if (recipe.items && recipe.items.map((item) => item.id).includes(item.id)) {
				item.checked = true;
			} else {
				item.checked = false;
			}
			return item;
		})
	);

	const handleSubmit = async (event) => {
		const vals = formatRecipeFormValues(event.target);
		if (vals?.items?.length) {
			validated = true;
			if (vals.id) {
				await recipes.update(vals.id, vals);
			} else {
				await recipes.add(vals);
			}

			event.target.reset();
			submitCallback();
		} else {
			validated = false;
		}
	};
</script>

<form
	class="grid-rows-[1fr 1fr auto 1fr] md:grid-rows-[1fr auto 1fr] m-4 md:grid-cols-8 grid grid-cols-1"
	name="AddRecipe"
	onsubmit={preventDefault(handleSubmit)}
>
	{#if recipe.id}
		<input type="hidden" id="id" name="id" value={recipe.id} />
	{/if}

	<span class="md:col-start-2 md:col-end-5 col-start-1 col-end-2">
		<label class="my-2 mx-auto block w-11/12" for="recipeName">Recipe Name</label>
		<input
			class="my-2 mx-auto block w-11/12"
			type="text"
			id="recipeName"
			name="name"
			required
			value={recipe.name ? recipe.name : ''}
		/>
	</span>

	<span class="md:col-start-5 md:col-end-8 col-start-1 col-end-2">
		<label class="my-2 mx-auto block w-11/12" for="recipeDescription">Recipe Description</label>
		<input
			class="my-2 mx-auto block w-11/12"
			type="text"
			id="recipeDescription"
			name="description"
			value={recipe.description ? recipe.description : ''}
			required
		/>
	</span>

	<div
		class="inventory mb-4 gap-2 md:col-start-2 md:col-end-8 col-span-full col-start-1 col-end-2 row-auto grid grid-cols-8"
	>
		<div class="mx-8 my-2 md:col-span-6 md:col-start-2 col-span-8">
			<!-- recipesInventoryFilter.query is used later on to hide items so users can filter large inventories quickly -->
			<Search
				searchTitle="Filter inventory"
				scrollTo={false}
				bind:searchStoreVal={recipesInventoryFilter.query}
			/>
		</div>
		{#if reactiveItems?.length}
			{#if !validated}
				<div class="p-2 col-start-1 col-end-7 block w-full bg-[#794949]">
					At least one item must be selected!
				</div>
			{/if}
			<div
				class="gap-2 lg:grid-cols-4 xl:grid-cols-6 col-span-full grid grid-cols-1 content-center items-start justify-center"
			>
				{#each reactiveItems as item}
					<!-- hide items here based on inventorySearch.query value as removing them entirely breaks the form -->
					<div
						class="gap-y-1 lg:w-auto lg:flex-col lg:justify-start flex w-full flex-row items-center justify-between odd:bg-[var(--back-color)] {item.name
							.toLowerCase()
							.includes(recipesInventoryFilter.query.toLowerCase())
							? 'block'
							: 'hidden'}"
					>
						<span
							class="gap-2 p-2 flex flex-row content-stretch items-center justify-start justify-self-auto"
						>
							<input
								id="inventoryItem-{item.id}"
								type="checkbox"
								class="m-0 md:scale-150 scale-125"
								value={item.id}
								name={item.name}
								bind:checked={item.checked}
							/>
							<label class="m-0 ml-2 lg:w-auto w-full" for="inventoryItem-{item.id}">
								{item.name}
							</label>
						</span>
						{#if item.checked}
							<span class="max-w-20 relative w-auto" transition:blur>
								<label
									class="start-2.5 top-4 -translate-y-4 text-sm text-gray-500 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-blue-600 dark:text-gray-200 peer-focus:dark:text-blue-500 absolute z-10 origin-[0] scale-75 transform duration-300 peer-placeholder-shown:scale-100 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
									for="inventoryItemServing-{item.id}"
								>
									Servings
								</label>
								<input
									id="inventoryItemServing-{item.id}"
									type="number"
									class="peer border-gray-300 bg-gray-50 px-1 pb-1 pt-4 text-sm text-gray-900 focus:border-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 block w-full appearance-none border-0 border-b-2 focus:ring-0 focus:outline-none"
									placeholder=" "
									required
									value={recipe.items && recipe.items.map((item) => item.id).includes(item.id)
										? recipe.items.find((el) => item.id === el.id).servings
										: 1}
									step="any"
								/>
							</span>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<p class="col-span-8">
				No items found in inventory! Go scan something or Add an Item to your Inventory manually
				before creating a recipe.
			</p>
		{/if}
	</div>
	<input
		type="submit"
		class="md:col-start-3 md:col-end-7 col-start-1 col-end-2"
		value={recipe.id ? 'Update' : 'Save'}
	/>
</form>
