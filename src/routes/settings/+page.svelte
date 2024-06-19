<script>
	import { list } from '$utils/nutrients';
	import { settings, limits, goals } from '$stores/stores';
	import { onMount, afterUpdate } from 'svelte';
	import { blur } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import CounterOptions from '$lib/counts/CounterOptions.svelte';
	import ExportData from '$lib/data/ExportData.svelte';
	import ImportData from '$lib/data/ImportData.svelte';
	import Spinner from '$lib/Spinner.svelte';

	$: enabled = list;
	onMount(async () => {
		await settings.init();
		setEnabledItems();
	});
	afterUpdate(() => {
		setEnabledItems();
	});

	const setEnabledItems = () => {
		if ($settings !== undefined) {
			enabled = list
				.map((item) => {
					item.position = $settings[item.key]?.value?.position;
					return item;
				})
				.sort((a, b) => a.position - b.position);
		}
	};

	const moveCallback = (positionA, positionB) => {
		const x = Object.values($settings).find(({ value }) => value.position === positionA);
		const y = Object.values($settings).find(({ value }) => value.position === positionB);

		if (x && y) {
			$settings[x.name].value.position = positionB;
			$settings[y.name].value.position = positionA;
			setEnabledItems();
		}
	};
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
				{#each enabled as nutrient, index (nutrient.key)}
					<div
						class="m-auto flex-[2_1_auto] bg-gray-200 px-1 pb-4 pt-2 text-black sm:max-w-full md:max-w-[65%] lg:max-w-[30%]"
						transition:blur
						animate:flip={{ duration: 900 }}
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
							<CounterOptions
								max={nutrient?.countMax}
								key={nutrient.key}
								bind:interval={$settings[nutrient.key].value.interval}
								moveUpCallback={() =>
									moveCallback(
										$settings[nutrient.key].value.position,
										$settings[nutrient.key].value.position - 1
									)}
								moveDownCallback={() =>
									moveCallback(
										$settings[nutrient.key].value.position,
										$settings[nutrient.key].value.position + 1
									)}
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
