<script>
	import { list } from '$utils/nutrients';
	import { today, goals, limits, settings } from '$stores/stores.svelte';
	import { blur } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import Counter from '$lib/counts/Counter.svelte';
	import Date from '$lib/Date.svelte';
	import Add from '$lib/Add.svelte';
	import Spinner from '$lib/Spinner.svelte';

	let enabled = $derived.by(() => {
		if (settings !== undefined) {
			return list
				.filter((item) => {
					if (settings.get()[item.key]?.value?.enabled) {
						item.position = settings.get()[item.key]?.value?.position;
						return item;
					}
				})
				.filter((val) => val !== undefined)
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
						bind:count={
							() => today.get()[nutrient.key],
							(v) =>
								today.update({
									...today.get(),
									[nutrient.key]: v
								})
						}
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
						limit={limits.get()[nutrient.key]?.value ? limits.get()[nutrient.key].value : null}
						goal={goals.get()[nutrient.key]?.value ? goals.get()[nutrient.key].value : null}
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
			{/each}
		{/if}
	{/await}
</div>

<Add />
