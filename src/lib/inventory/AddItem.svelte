<script>
	import { preventDefault } from 'svelte/legacy';

	import { inventory } from '$stores/stores.svelte';
	import { formatInventoryFormValues } from '$utils/formValues';
	import AddNutrientInputs from './AddNutrientInputs.svelte';

	/** @type {{item?: any, submitCallback?: any}} */
	let { item = {}, submitCallback = () => false } = $props();
	let validated = $state(true);

	const handleSubmit = async (event) => {
		const vals = formatInventoryFormValues(event.target);
		if (vals?.nutrients && Object.entries(vals?.nutrients).length) {
			validated = true;
			if (vals.id) {
				await inventory.update(vals.id, vals);
			} else {
				await inventory.add(vals);
			}
			event.target.reset();
			submitCallback();
		} else {
			validated = false;
		}
	};
</script>

<form
	name="AddItem"
	onsubmit={preventDefault(handleSubmit)}
	class="grid-rows-[1fr 1fr 1fr auto 1fr] md:grid-rows-[1fr auto 1fr] m-4 grid grid-cols-1 md:grid-cols-3"
>
	{#if item?.id}
		<input type="hidden" id="id" name="id" value={item.id} />
	{/if}
	<span class="col-start-1 col-end-2">
		<label for="name">Name</label>
		<input type="text" id="name" name="name" value={item.name ? item.name : ''} required />
	</span>

	<span class="col-start-1 col-end-2 md:col-start-2 md:col-end-3">
		<label for="description">Description</label>
		<input
			type="text"
			id="description"
			name="description"
			value={item.description ? item.description : ''}
			required
		/>
	</span>

	<span class="col-start-1 col-end-2 md:col-start-3 md:col-end-4">
		<label for="barcode">Barcode</label>
		<input
			type="text"
			id="barcode"
			name="barcode"
			value={item.barcode ? item.barcode : ''}
			placeholder="UPC/Unique ID"
		/>
	</span>
	<AddNutrientInputs bind:validated nutrients={item.nutrients ? item.nutrients : {}} />
	<input
		type="submit"
		class="col-start-1 col-end-2 md:col-start-2 md:col-end-3"
		value={item.id ? 'Update' : 'Save'}
	/>
</form>

<style>
	form input,
	form label {
		margin: 0.5rem auto;
		display: block;
		width: 90%;
	}
</style>
