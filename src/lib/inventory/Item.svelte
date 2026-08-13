<script>
	import { successToast, errorToast, confirmDialog } from '$utils/toast.js';
	import { today, inventory, recipes } from '$stores/stores.svelte';
	import { toTwoDecimals } from '$utils/numbers';
	import NutrientList from '$lib/items/NutrientList.svelte';
	import ItemControls from '$lib/items/ItemControls.svelte';
	import AddItem from '$lib/inventory/AddItem.svelte';

	/** @type {{item: any}} */
	let { item } = $props();
	let servings = $state(1);
	let edit = $state(false);

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

	const duplicateItem = async () => {
		const { id, barcode, created, ...rest } = item;
		await inventory.add(rest);
		successToast(`Duplicated ${rest.name}!`);
	};
</script>

<div class="flex flex-row justify-between">
	<h4 class="ml-0 sm:mb-1 md:mb-2">{item.name}</h4>
	<p class="font-bold text-xs uppercase">Item</p>
</div>
<div>
	{#if edit}
		<AddItem {item} submitCallback={() => (edit = false)} />
	{:else}
		<div class="text-sm">{item.description}</div>
		{#if item.nutrients}
			<NutrientList list={item.nutrients} />
		{/if}
		<ItemControls
			{item}
			onAddClick={addToToday}
			onDeleteClick={confirmDelete}
			onDuplicateClick={duplicateItem}
			onEditClick={() => (edit = !edit)}
			bind:servings
		/>
	{/if}
</div>
