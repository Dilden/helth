<script lang="typescript">
	/** @type {{item: InventoryItem | Nutrient}} */
	let { item } = $props();
	let servings = $state(1);
</script>

<!--add to daily total -->
<div class="flex flex-row justify-start align-middle">
	<div class="relative m-2">
		<label
			class="absolute inset-s-2.5 top-4 z-10 origin-left -translate-y-4 scale-75 transform text-xs text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:rtl:left-auto peer-focus:rtl:translate-x-1/4 dark:text-gray-200 dark:peer-focus:text-blue-500"
			for="itemServing-{item.id}"
		>
			Servings
		</label>
		<input
			id="itemServing-{item.id}"
			type="number"
			class="peer block w-14 appearance-none border-0 border-b-2 border-gray-300 bg-gray-50 px-1 pt-4 pb-2 text-sm text-gray-900 focus:border-blue-600 focus:ring-0 focus:outline-hidden dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
			placeholder="1"
			required
			bind:value={servings}
			step="any"
			title="Number of servings to add to daily total"
		/>
	</div>
	<button class="m-2" title="Add to Daily Total">➕</button>
	<!-- edit	-->
	<button onclick={() => {}} title="Edit" class="m-2">✏️</button>
	<!-- duplicate	-->
	<button onclick={() => {}} title="Duplicate" class="m-2">⏩</button>
	<!-- remove from db -->
	<button class="m-2" title="Delete">🗑️</button>
</div>
