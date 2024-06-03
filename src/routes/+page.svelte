<script>
	import { list } from '$utils/nutrients';
	import { today, settings, limits, goals } from '$stores/stores';
	import { blur } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { onMount, afterUpdate } from 'svelte';
	// import { dragOver, dragStart, drop, dragEnter, dragLeave } from '$utils/dnd';
	import Counter from '$lib/counts/Counter.svelte';
	import Date from '$lib/Date.svelte';
	import Add from '$lib/Add.svelte';
	import Spinner from '$lib/Spinner.svelte';

	$: enabled = list;
	onMount(async () => {
		await settings.init();
		// setEnabledItems();
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
		}
	};

	const moveCallback = (moveIndex, swapWithIndex) => {
		// if (moveIndex && swapWithIndex) {
		// 	const key = enabled[moveIndex].key;
		// 	const swapKey = enabled[swapWithIndex].key;
		// 	console.log('key is: ' + key);
		// 	console.log('to swap with: ' + swapKey);
		// 	const moveTo = $settings[swapKey].value.position;
		// 	$settings[swapKey].value.position = $settings[key].value.position;
		// 	$settings[key].value.position = moveTo;
		// 	console.log($settings[swapKey].value.position);
		// 	console.log($settings[key].value.position);
		// 	setEnabledItems();
		// }
		// if( $settings[moveKey].value.position === 0) {
		//   return;
		// }
		// if($settings[moveKey].value.position <= $settings[prevKey].value.position) {
		//   $settings[moveKey].value.position = $settings[moveKey].value.position + 1;
		//   $settings[prevKey].value.position = $settings[prevKey].value.position - 1;
		// }
		// if($settings[moveKey].value.position > $settings[prevKey].value.position) {
		//   $settings[moveKey].value.position = $settings[moveKey].value.position - 1;
		//   $settings[prevKey].value.position = $settings[prevKey].value.position + 1;
		// }
	};
	// const moveDownCallback = (incrementKey, decrementKey) => {};
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
					/>
				</div>
			{/each}
		{/if}
	{/await}
</div>

<Add />
