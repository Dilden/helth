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
	let reactiveItems = $state(
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
	class="grid-rows-[1fr 1fr auto 1fr] md:grid-rows-[1fr auto 1fr] m-4 grid grid-cols-1 md:grid-cols-8"
	name="AddRecipe"
	onsubmit={preventDefault(handleSubmit)}
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
		class="inventory col-span-full col-start-1 col-end-2 row-auto mb-4 grid grid-cols-8 gap-2 md:col-start-2 md:col-end-8"
	>
		<div class="col-span-8 mx-8 my-2 md:col-span-6 md:col-start-2">
			<!-- recipesInventoryFilter.query is used later on to hide items so users can filter large inventories quickly -->
			<Search
				searchTitle="Filter inventory"
				scrollTo={false}
				bind:searchStoreVal={recipesInventoryFilter.query}
			/>
		</div>
		{#if reactiveItems?.length}
			{#if !validated}
				<div class="col-start-1 col-end-7 block w-full bg-[#794949] p-2">
					At least one item must be selected!
				</div>
			{/if}
			<div
				class="col-span-full grid grid-cols-1 content-center items-start justify-center gap-2 lg:grid-cols-4 xl:grid-cols-6"
			>
				{#each reactiveItems as item}
					<!-- hide items here based on inventorySearch.query value as removing them entirely breaks the form -->
					<div
						class="flex w-full flex-row items-center justify-between gap-y-1 odd:bg-[var(--back-color)] lg:w-auto lg:flex-col lg:justify-start {item.name
							.toLowerCase()
							.includes(recipesInventoryFilter.query.toLowerCase())
							? 'block'
							: 'hidden'}"
					>
						<span
							class="flex flex-row content-stretch items-center justify-start gap-2 justify-self-auto p-2"
						>
							<input
								id="inventoryItem-{item.id}"
								type="checkbox"
								class="m-0 scale-125 md:scale-150"
								value={item.id}
								name={item.name}
								bind:checked={item.checked}
							/>
							<label class="m-0 ml-2 w-full lg:w-auto" for="inventoryItem-{item.id}">
								{item.name}
							</label>
						</span>
						{#if item.checked}
							<span class="relative w-auto max-w-20" transition:blur>
								<label
									class="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-200 peer-focus:dark:text-blue-500"
									for="inventoryItemServing-{item.id}"
								>
									Servings
								</label>
								<input
									id="inventoryItemServing-{item.id}"
									type="number"
									class="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-50 px-1 pb-1 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
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
		class="col-start-1 col-end-2 md:col-start-3 md:col-end-7"
		value={recipe.id ? 'Update' : 'Save'}
	/>
</form>
