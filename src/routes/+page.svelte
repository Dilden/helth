<script>
	import { list } from '$utils/nutrients';
	import { today, settings, limits, goals } from '$stores/stores';
	import { blur } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { onMount, afterUpdate } from 'svelte';
	import { dragOver, dragStart, drop, dragEnter, dragLeave } from '$utils/dnd';
	import Counter from '$lib/counts/Counter.svelte';
	import Date from '$lib/Date.svelte';
	import Add from '$lib/Add.svelte';
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
				.filter((item) => {
					if ($settings[item.key]?.value?.enabled) {
						return item;
					} else {
						return undefined;
					}
				})
				.filter((val) => val !== undefined)
				.sort((a, b) => a.position - b.position);
			// sort by numerical property
			// sort alphabetically
			// .sort((a, b) => {
			// 	if (a.key > b.key) {
			// 		return -1;
			// 	}
			// 	if (a.key < b.key) {
			// 		return 1;
			// 	}
			// 	return 0;
			// });
		}
	};
</script>

<h2 class="text-center">🗒 track</h2>
<Date />

<p
	id="counter_drop_zone"
	on:dragover={dragOver}
	on:drop={drop}
	on:dragenter={dragEnter}
	on:dragleave={dragLeave}
	class="flex-start flex w-full flex-row flex-wrap justify-center gap-4 gap-y-7 transition-all md:justify-start md:gap-y-3"
>
	{#await Promise.all([settings.init(), today.init(), limits.init(), goals.init()])}
		<Spinner />
	{:then}
		{#if enabled.length !== 0}
			{#each enabled as nutrient (nutrient.key)}
				<p
					id="counter_{nutrient.key}"
					class="m-auto flex-[2_1_auto] transition-all sm:max-w-full md:max-w-[65%] lg:max-w-[30%]"
					transition:blur
					animate:flip={{ duration: 900 }}
					draggable="true"
					on:dragstart={dragStart}
				>
					<Counter
						item={nutrient}
						bind:count={$today[nutrient.key]}
						bind:interval={$settings[nutrient.key].value.interval}
						limit={$limits[nutrient.key]?.value ? $limits[nutrient.key].value : null}
						goal={$goals[nutrient.key]?.value ? $goals[nutrient.key].value : null}
					/>
				</p>
			{/each}
		{/if}
	{/await}
</p>

<Add />
