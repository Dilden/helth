<script>
	import { nutrientSumsFromList, applyServings } from '$utils/item';
	import { toTwoDecimals } from '$utils/numbers';
	import { confirmDialog, successToast, errorToast } from '$utils/toast.js';
	import { recipes, today } from '$stores/stores.svelte';
	import NutrientList from '$lib/items/NutrientList.svelte';
	import ItemControls from '$lib/items/ItemControls.svelte';

	/** @type {{recipe?: any}} */
	let { recipe = {} } = $props();

	let servings = $state(1);
	// svelte-ignore state_referenced_locally
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

<div class="flex flex-row justify-between">
	<h4 class="mx-0 ml-0 sm:my-1 md:my-2 text-md">{recipe.name}</h4>
	<p class="font-bold text-xs uppercase">Recipe</p>
</div>
<div class="text-sm">{recipe.description}</div>
<div>
	<ul class="list-none sm:pl-0 sm:text-left md:text-center">
		{#each recipe.items as item}
			<li class="text-sm lg:text-md mx-2 my-0 inline-block font-bold">
				{item.name}
			</li>
		{/each}
	</ul>
	<NutrientList list={itemNutrientSums} />
	<ItemControls item={recipe} />
</div>
