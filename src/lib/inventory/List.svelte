<script>
	import { preventDefault } from 'svelte/legacy';

	import Item from './Item.svelte';
	import AddItem from '$lib/inventory/AddItem.svelte';
	import Spinner from '$lib/Spinner.svelte';
	import Search from '$lib/misc/Search.svelte';
	import { inventory, inventorySearchResults, inventorySearch } from '$stores/stores.svelte';
	import { successToast } from '$utils/toast.js';

	let editing = $state(undefined);
	let formVisible = $state(false);

	const editItem = (item) => {
		formVisible = false;
		editing = item;
	};

	const duplicateItem = async (item) => {
		const { id, barcode, created, ...rest } = item;
		await inventory.add(rest);
		successToast(`Duplicated ${rest.name}!`);
	};

	const closeEdit = (id) => {
		const top = document.getElementById(id);
		top.scrollIntoView({ behavior: 'smooth' });
		editing = undefined;
	};
</script>

<button
	class="m-4"
	onclick={preventDefault(() => {
		formVisible = !formVisible;
		editing = undefined;
	})}>{!formVisible ? 'Add Item' : 'Cancel'}</button
>

{#if formVisible}
	<AddItem
		submitCallback={() => {
			formVisible = false;
			editing = undefined;
		}}
	/>
{/if}
<div class="grid grid-cols-1 grid-rows-[1fr_auto] md:grid-cols-2">
	<h3 class="col-start-1 col-end-3 md:col-end-2">Saved Items</h3>
	<div class="relative col-start-1 col-end-2 m-2 mt-0 md:col-start-2 md:col-end-3">
		<Search bind:searchStoreVal={inventorySearch.query} />
	</div>
	<ul aria-label="inventory-list" class="col-start-1 col-end-2 mb-8 list-none p-0 md:col-end-3">
		{#await inventory.init()}
			<Spinner />
		{:then}
			{#if inventory.get().length}
				{#each inventorySearchResults().results.slice().reverse() as item}
					<li id="listitem-item-{item.id}" class="m-3 p-2 odd:bg-[#1f2a2d] md:p-4">
						{#if editing?.id === item.id}
							<AddItem {item} submitCallback={() => closeEdit(`listitem-item-${item.id}`)} />
							<button
								title="Cancel"
								onclick={preventDefault(() => closeEdit(`listitem-item-${item.id}`))}
								class="m-2"
							>
								Cancel
							</button>
							<!-- cancel -->
						{:else}
							<Item {item} />
							<button title="Edit Item" onclick={() => editItem(item)} class="m-1 sm:m-2">✏️</button
							>
							<!-- edit  -->
							<button
								title="Duplicate Item"
								onclick={preventDefault(() => duplicateItem(item))}
								class="m-1 sm:m-2">⏩</button
							>
						{/if}
					</li>
				{/each}
			{/if}
		{:catch error}
			<p>Error displaying inventory: {error}</p>
		{/await}
	</ul>
</div>
