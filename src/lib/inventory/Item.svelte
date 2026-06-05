<script>
	import { successToast, errorToast, confirmDialog } from '$utils/toast.js';
	import { today, inventory, recipes } from '$stores/stores.svelte';
	import { toTwoDecimals } from '$utils/numbers';

	/** @type {{item: any}} */
	let { item } = $props();
	let servings = $state(1);

	const addToToday = () => {
		try {
			const sums = item.nutrients.reduce((obj, item) => {
				// total of new nutrients * servings
				let toAdd = toTwoDecimals(item.quantity * Number(servings));

				// add that to existing total in today
				let newTotal = {
					[item.key]: toAdd + today.get()[item.key]
				};
				return Object.assign(obj, newTotal);
			}, {});

			today.update({
				...today.get(),
				...sums
			});
			successToast(`Added ${servings} servings of ${item.name} to daily total!`);
		} catch (err) {
			console.log(err);
			errorToast('Error adding to total!');
		}
	};

	const confirmDelete = () => {
		confirmDialog(
			'Are you sure you want to delete this item? This item will also be removed from any Recipes it has been included in.',
			deleteItem,
			() => false
		);
	};

	const deleteItem = async () => {
		await inventory
			.remove(item.id)
			.then(() => successToast('Removed item!'))
			.catch(() => errorToast('Error deleting item!'));
		await recipes.init(); // recipes store must be re-initialized as its state will remain stale otherwise
	};
</script>

<h4 class="ml-0 sm:mb-1 md:mb-2">{item.name}</h4>
<div>
	<div class="text-sm">{item.description}</div>
	{#if item.nutrients}
		<ul class="sm:pl-0 sm:text-left md:text-center list-none">
			{#each item.nutrients as nutrient}
				{#if nutrient.quantity > 0}
					<li class="mx-2 my-0 text-xs inline-block italic">
						{nutrient.name}: {nutrient.quantity}{nutrient.unit}
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
</div>

<div class="relative inline-block align-middle">
	<label
		class="inset-s-2.5 top-4 -translate-y-4 text-xs text-gray-500 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-blue-600 dark:text-gray-200 dark:peer-focus:text-blue-500 absolute z-10 origin-left scale-75 transform duration-300 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:rtl:left-auto peer-focus:rtl:translate-x-1/4"
		for="inventoryItemServing-{item.id}"
	>
		Servings
	</label>
	<input
		id="inventoryItemServing-{item.id}"
		type="number"
		class="peer w-14 border-gray-300 bg-gray-50 px-1 pb-2 pt-4 text-sm text-gray-900 focus:border-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 block appearance-none border-0 border-b-2 focus:ring-0 focus:outline-hidden"
		placeholder="1"
		required
		bind:value={servings}
		step="any"
		title="Number of servings to add to daily total"
	/>
</div>
<!--add to daily total -->
<button
	class="mx-1 my-0"
	onclick={addToToday}
	title="Add Item nutients (times specified servings) to Daily Total">➕</button
>
<!-- <button title="Add to Recipe">📑</button> <!-- add to recipe -->
<!-- remove from db -->
<button class="m-1 sm:m-2 float-right" onclick={confirmDelete} title="Delete Item from Inventory">
	🗑️
</button>
