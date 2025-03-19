<script>
	import { settings } from '$stores/stores.svelte';
	import { list } from '$utils/nutrients';
	import Spinner from '$lib/Spinner.svelte';

	/** @type {{nutrients?: any, validated?: boolean}} */
	let { nutrients = [], validated = true } = $props();
</script>

<div class="col-start-1 col-end-4">
	<hr />
	<h4 class="ml-0">Nutrients</h4>
	<em>Enter quantities based on individual serving size</em>
	<fieldset
		class="gap-15px col-start-1 col-end-4 m-0 flex flex-row flex-wrap justify-center border-none px-1 py-0"
	>
		{#if !validated}
			<div class="block w-full bg-[#794949] p-4">At least one nutrient is required!</div>
		{/if}
		{#await settings.init()}
			<Spinner />
		{:then}
			{#each list as nutrient}
				<!-- only hiding values so they any new items scanned will have all possible data -->
				<span
					class="nutrient p-1 {nutrient.key} {settings.get()[nutrient.key]?.value?.enabled
						? 'inline-block'
						: 'hidden'}"
				>
					<label class="block" for={nutrient.key}>{nutrient.name}</label>
					<input
						class="block"
						id={nutrient.key}
						name={nutrient.key}
						type="text"
						placeholder={nutrient.unit}
						value={nutrients.length && nutrients.find(({ key }) => key === nutrient.key)
							? nutrients.find(({ key }) => key === nutrient.key).quantity
							: ''}
					/>
				</span>
			{/each}
		{/await}
	</fieldset>
	<hr />
</div>

<style>
	@media screen and (max-width: 540px) {
		.nutrient {
			width: 100%;
			margin: 0 auto;
		}
		.nutrient label,
		.nutrient input {
			width: 100%;
		}
	}
</style>
