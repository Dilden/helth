<script>
	import { list } from '$utils/nutrients';
	import { limits, goals, settings } from '$stores/stores.svelte';
	import { enhance } from '$app/forms';
	import { blur } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';
	import { Tabs, TabList, TabPanel, Tab } from '$lib/tabs/tabs.js';
	import CounterOptions from '$lib/counts/CounterOptions.svelte';
	import ExportData from '$lib/data/ExportData.svelte';
	import ImportData from '$lib/data/ImportData.svelte';
	import SyncForm from '$lib/data/SyncForm.svelte';
	import Spinner from '$lib/Spinner.svelte';

	let enabled = $derived.by(() => {
		if (settings.get() !== undefined) {
			return list
				.map((item) => {
					item.position = settings.get()[item.key]?.value?.position;
					return item;
				})
				.sort((a, b) => a.position - b.position);
		}
	});

	const moveCallback = (positionA, positionB) => {
		const x = Object.values(settings.get()).find(({ value }) => value.position === positionA);
		const y = Object.values(settings.get()).find(({ value }) => value.position === positionB);

		if (x && y) {
			// bit verbose but MUST PASS THE ENTIRE OBJECT
			settings.update(x.name, {
				name: x.name,
				value: {
					...settings.get()[x.name].value,
					position: positionB
				}
			});
			settings.update(y.name, {
				name: y.name,
				value: {
					...settings.get()[y.name].value,
					position: positionA
				}
			});
		}
	};
</script>

<div class="p-7">
	<h2>⚙️ settings</h2>
	<Tabs>
		<TabList>
			<Tab>🏅goals + limits</Tab>
			<Tab>💾 data</Tab>
		</TabList>
		<TabPanel>
			{#await Promise.all([settings.init(), limits.init(), goals.init()])}
				<Spinner />
			{:then}
				<div
					class="flex-start flex w-full flex-row flex-wrap justify-center gap-4 gap-y-7 pt-2 md:justify-start md:gap-y-3"
				>
					{#each enabled as nutrient, index (nutrient.key)}
						<div
							class="m-auto flex-[2_1_auto] flex-col bg-gray-200 px-1 pt-2 pb-4 text-center text-black sm:max-w-full md:max-w-[65%] lg:max-w-[30%]"
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
									class="w-full touch-manipulation appearance-none bg-slate-100"
									id="goals_{nutrient.key}"
									bind:value={
										() => goals.get()[nutrient.key].value,
										(v) => goals.update(nutrient.key, { name: nutrient.key, value: v })
									}
									type="number"
									min="0"
								/>
							</div>
							<div class="text-m inline-block w-1/3">
								<label class="w-full" for="limit_{nutrient.key}">Limit</label>
								<input
									class="w-full touch-manipulation appearance-none bg-slate-100"
									id="limit_{nutrient.key}"
									bind:value={
										() => limits.get()[nutrient.key].value,
										(v) => limits.update(nutrient.key, { name: nutrient.key, value: v })
									}
									type="number"
									min="0"
								/>
							</div>
							<div class="my-2">
								<CounterOptions
									max={nutrient?.countMax}
									key={nutrient.key}
									bind:interval={
										() => settings.get()[nutrient.key].value.interval,
										(v) =>
											settings.update(nutrient.key, {
												name: nutrient.key,
												value: {
													...settings.get()[nutrient.key].value,
													interval: v
												}
											})
									}
									moveUpCallback={() =>
										moveCallback(
											settings.get()[nutrient.key].value.position,
											settings.get()[nutrient.key].value.position - 1
										)}
									moveDownCallback={() =>
										moveCallback(
											settings.get()[nutrient.key].value.position,
											settings.get()[nutrient.key].value.position + 1
										)}
								/>
							</div>
						</div>
					{/each}
				</div>
			{/await}
		</TabPanel>
		<TabPanel>
			<div class="flex flex-col justify-center">
				<div class="mx-auto my-6 flex-auto"><ExportData /></div>
				<div class="mx-auto my-6 flex-auto"><ImportData /></div>
			</div>
		</TabPanel>
	</Tabs>
</div>

<style>
	input[type='number'] {
		appearance: textfield;
	}
</style>
