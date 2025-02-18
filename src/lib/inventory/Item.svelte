<script>
	import { successToast, errorToast, confirmDialog } from '$utils/toast.js';
	import { today, inventory, recipes } from '$stores/stores';
	import { toTwoDecimals } from '$utils/numbers';

	/** @type {{item: any}} */
	let { item } = $props();

	const addToToday = () => {
		try {
			const servings = document.getElementById(`inventoryItemServing-${item.id}`).value;
			item.nutrients.map((index) => {
				const amount = toTwoDecimals(index.quantity * Number(servings));
				$today[index.key] = $today[index.key] || 0;
				$today[index.key] = $today[index.key] + amount;
			});
			successToast(`Added ${servings} servings to daily total!`);
		} catch (err) {
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
			.delete(item.id)
			.then(() => successToast('Removed item!'))
			.catch(() => errorToast('Error deleting item!'));
		await recipes.init();
	};
</script>

<h4 class="ml-0 sm:mb-1 md:mb-2">{item.name}</h4>
<div>
	<div class="text-sm">{item.description}</div>
	{#if item.nutrients}
		<ul class="list-none sm:pl-0 sm:text-left md:text-center">
			{#each item.nutrients as nutrient}
				{#if nutrient.quantity > 0}
					<li class="mx-2 my-0 inline-block text-xs italic">
						{nutrient.name}: {nutrient.quantity}{nutrient.unit}
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
</div>

<div class="relative inline-block align-middle">
	<label
		class="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-xs text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-200 peer-focus:dark:text-blue-500"
		for="inventoryItemServing-{item.id}"
	>
		Servings
	</label>
	<input
		id="inventoryItemServing-{item.id}"
		type="number"
		class="peer block w-14 appearance-none border-0 border-b-2 border-gray-300 bg-gray-50 px-1 pb-2 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
		placeholder="1"
		required
		value="1"
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
<button class="float-right m-1 sm:m-2" onclick={confirmDelete} title="Delete Item from Inventory">
	🗑️
</button>
