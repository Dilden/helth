<script>
	import { list } from '$utils/nutrients';
	import { today, settings, limits, goals } from '$stores/stores';
	import { blur } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';
	import Counter from '$lib/counts/Counter.svelte';
	import Date from '$lib/Date.svelte';
	import Add from '$lib/Add.svelte';
	import Spinner from '$lib/Spinner.svelte';

	let enabled = $state(list);
	onMount(async () => {
		await settings.init();
		setEnabledItems();
	});
	$effect(() => {
		setEnabledItems();
	});

	const setEnabledItems = () => {
		if ($settings !== undefined) {
			enabled = list
				.filter((item) => {
					if ($settings[item.key]?.value?.enabled) {
						item.position = $settings[item.key]?.value?.position;
						return item;
					}
				})
				.filter((val) => val !== undefined)
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

<h2 class="text-center">🗒 track</h2>
<Date />

<div
	class="flex-start flex flex-row flex-wrap justify-center gap-4 gap-y-7 transition-all md:justify-start md:gap-y-3"
>
	{#await Promise.all([settings.init(), today.init(), limits.init(), goals.init()])}
		<Spinner />
	{:then}
		{#if enabled.length !== 0}
			{#each enabled as nutrient, index (nutrient.key)}
				<div
					id="counter_{nutrient.key}"
					class="relative top-1/2 m-auto flex-[2_1_auto] p-1 text-3xl transition-all sm:max-w-full md:max-w-[65%] lg:max-w-[30%]"
					transition:blur
					animate:flip={{ duration: 900 }}
				>
					<Counter
						item={nutrient}
						bind:count={$today[nutrient.key]}
						bind:interval={$settings[nutrient.key].value.interval}
						limit={$limits[nutrient.key]?.value ? $limits[nutrient.key].value : null}
						goal={$goals[nutrient.key]?.value ? $goals[nutrient.key].value : null}
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
			{/each}
		{/if}
	{/await}
</div>

<Add />
