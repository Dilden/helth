<script>
	import { nutrientSumsFromList, applyServings } from '$utils/item';
	import { toTwoDecimals } from '$utils/numbers';
	import { confirmDialog, successToast, errorToast } from '$utils/toast.js';
	import { recipes, today } from '$stores/stores.svelte';

	/** @type {{recipe?: any}} */
	let { recipe = {} } = $props();

	let servings = $state(1);
	let itemNutrientSums = nutrientSumsFromList(applyServings(recipe.items));

	const confirmDelete = () => {
		confirmDialog('Are you sure you want to delete this item?', deleteRecipe, () => false);
	};

	const addToToday = () => {
		try {
			const sums = itemNutrientSums.reduce((obj, item) => {
				// total of new nutrients * servings
				let toAdd = toTwoDecimals(item.quantity * Number(servings));

				// add that to existing total in today
				let newTotal = {
					[item.key]: toAdd + today.get()[item.key]
				};
				// console.log(newTotal);
				return Object.assign(obj, newTotal);
			}, {});

			today.update({
				...today.get(),
				...sums
			});
			successToast(`Added ${servings} servings of ${recipe.name} to daily total!`);
		} catch (err) {
			errorToast('Error adding to total!');
		}
	};
	const deleteRecipe = async () => {
		await recipes
			.remove(recipe.id)
			.then(() => successToast('Removed recipe!'))
			.catch(() => errorToast('Error deleting recipe!'));
	};
</script>

<h4 class="mx-0 ml-0 sm:my-1 md:my-2">{recipe.name}</h4>
<div class="text-sm">{recipe.description}</div>
<div>
	<ul class="list-none sm:pl-0 sm:text-left md:text-center">
		{#each recipe.items as item}
			<li class="text-md mx-2 my-0 inline-block font-bold">
				{item.name}
			</li>
		{/each}
	</ul>
	<ul class="list-none text-center sm:pl-0">
		{#each itemNutrientSums as nutrient}
			<li class="mx-2 my-1 inline-block text-sm italic">
				{nutrient.name + ': ' + nutrient.quantity + nutrient.unit}
			</li>
		{/each}
	</ul>
</div>

<div class="relative inline-block align-middle">
	<label
		class="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-xs text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-200 peer-focus:dark:text-blue-500"
		for="recipeServing-{recipe.id}"
	>
		Servings
	</label>
	<input
		id="recipeServing-{recipe.id}"
		type="number"
		class="peer block w-14 appearance-none border-0 border-b-2 border-gray-300 bg-gray-50 px-1 pb-2 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
		placeholder="1"
		required
		bind:value={servings}
		step="any"
		title="Number of servings to add to daily total"
	/>
</div>
<!--add to daily total -->
<button
	class="mx-1 my-0 sm:mx-2"
	onclick={addToToday}
	title="Add Recipe nutients (multiplied by specified servings) to Daily Total">➕</button
>
<!-- remove from db -->
<button class="float-right m-1 sm:m-2" onclick={confirmDelete} title="Delete Recipe">🗑️</button>
