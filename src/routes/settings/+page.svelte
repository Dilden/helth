<script>
	import { list } from '$utils/nutrients';
	import { settings, limits, goals } from '$stores/stores';
	import ExportData from '$lib/data/ExportData.svelte';
	import ImportData from '$lib/data/ImportData.svelte';
	import Spinner from '$lib/Spinner.svelte';
</script>

<div class="p-7 text-center">
	<h2>⚙️ settings</h2>
	{#await Promise.all([settings.init(), limits.init(), goals.init()])}
		<Spinner />
	{:then}
		<details class="my-2">
			<summary class="text-left text-2xl"> 🏅goals, limits, & nutrients </summary>
			<div
				class="flex-start flex w-full flex-row flex-wrap justify-center gap-4 gap-y-7 md:justify-start md:gap-y-3"
			>
				{#each list as nutrient}
					<div
						class="alt-bg m-auto flex-[2_1_auto] px-1 pb-4 pt-2 sm:max-w-full md:max-w-[65%] lg:max-w-[30%]"
					>
						<div class="w-full text-center text-xl font-medium">
							{(nutrient?.emoji ? nutrient?.emoji + ' ' : '') +
								nutrient.name +
								` (${nutrient.unit})`}
						</div>
						<div class="text-m inline-block w-1/3">
							<label class="w-full" for="goals_{nutrient.key}">Goal</label>
							<input
								class="w-full"
								id="goals_{nutrient.key}"
								bind:value={$goals[nutrient.key].value}
								type="number"
								min="0"
							/>
						</div>
						<div class="text-m inline-block w-1/3">
							<label class="w-full" for="limit_{nutrient.key}">Limit</label>
							<input
								class="w-full"
								id="limit_{nutrient.key}"
								bind:value={$limits[nutrient.key].value}
								type="number"
								min="0"
							/>
						</div>
						<div class="my-2">
							<label for="enabled_{nutrient.key}" class="font-bold">Show this nutrient?</label>
							<input
								type="checkbox"
								id="enabled_{nutrient.key}"
								class="m-1 mb-3 p-2"
								bind:checked={$settings[nutrient.key].value.enabled}
							/>
						</div>
					</div>
				{/each}
			</div>
		</details>
	{/await}
	<details class="my-2">
		<summary class="text-left text-2xl">💾 data</summary>
		<div class="mx-auto my-6 inline-block"><ExportData /></div>
		<div class="mx-auto my-6 inline-block"><ImportData /></div>
	</details>
</div>

<style>
	.alt-bg:nth-child(even) {
		background-color: #1a2426;
	}
</style>
