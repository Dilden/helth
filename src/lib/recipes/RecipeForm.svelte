<script>
	import { recipes } from '$stores/stores.js';
	import { formatRecipeFormValues } from '$utils/formValues';

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
	class="grid-rows-[1fr 1fr auto 1fr] md:grid-rows-[1fr auto 1fr] grid-cols-1 md:grid-cols-8 m-4 grid"
	name="AddRecipe"
	on:submit|preventDefault={handleSubmit}
>
	{#if recipe.id}
		<input type="hidden" id="id" name="id" value={recipe.id} />
	{/if}

	<span class="col-start-1 col-end-2 md:col-start-2 md:col-end-5">
		<label class="w-11/12 block mx-auto my-2" for="recipeName">Recipe Name</label>
		<input
      class="w-11/12 block mx-auto my-2"
			type="text"
			id="recipeName"
			name="name"
			required
			value={recipe.name ? recipe.name : ''}
		/>
	</span>

	<span class="col-start-1 col-end-2 md:col-start-5 md:col-end-8">
		<label class="w-11/12 block mx-auto my-2"for="recipeDescription">Recipe Description</label>
		<input
      class="w-11/12 block mx-auto my-2"
			type="text"
			id="recipeDescription"
			name="description"
			value={recipe.description ? recipe.description : ''}
			required
		/>
	</span>

	<div class="grid col-start-1 col-end-2 md:col-start-2 md:col-end-8 overflow-scroll mb-4 inventory gap-2 row-auto">
		{#if inventoryItems?.length}
			{#if !validated}
				<div class="block bg-[#794949] w-full p-2 col-start-1 col-end-7">At least one item must be selected!</div>
			{/if}
			{#each inventoryItems as item}
				<span class="justify-self-auto md:justify-center flex flex-row flex-nowrap items-center content-center">
					{#if recipe.items && recipe.items.map((item) => item.id).includes(item.id)}
						<input
							checked
							type="checkbox"
							value={item.id}
							name={item.name}
							id="inventoryItem-{item.id}"
              class="m-0 w-1/6"
						/>
					{:else}
						<input type="checkbox" class="m-0 w-1/6" value={item.id} name={item.name} id="inventoryItem-{item.id}" />
					{/if}
					<label class="m-0 pl-2" for="inventoryItem-{item.id}">
						{item.name}
					</label>
				</span>
			{/each}
		{:else}
			<p>
				No items found in inventory! Go scan something or Add an Item to your Inventory manually
				before creating a recipe.
			</p>
		{/if}
	</div>
	<input type="submit" class="col-start-1 col-end-2 md:col-start-3 md:col-end-7" value={recipe.id ? 'Update' : 'Save'} />
</form>

<style>
	.inventory {
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	}
</style>
