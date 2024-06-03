<script lang="ts">
	import { clickOutside } from '$utils/clickOutside';
	import { toTwoDecimals } from '$utils/numbers';
	import { fade } from 'svelte/transition';
	import { onMount, afterUpdate } from 'svelte';
	import CounterOptions from './CounterOptions.svelte';

	export let item: Nutrient;
	export let count: number = 0;
	export let interval: number = 1;
	export let limit = 0;
	export let goal = 0;

	export let moveUpCallback = () => {};
	export let moveDownCallback = () => {};

	const increment = (): number => {
		return (count = count + interval);
	};
	const decrement = (): number => {
		count = count - interval;
		if (count <= 0) {
			count = 0;
		}
		return count;
	};

	let showOptions = false;
	$: goalString = '';
	$: limitString = '';

	const diffMsg = () => {
		if (goal) {
			let diff = 0;
			diff = toTwoDecimals(goal - count);
			goalString =
				diff >= 0 ? `${diff} to 🥅` : `<span class="text-teal-600">${-diff} over goal! 🥳</span>`;
		}
		if (limit) {
			let diff = 0;
			diff = toTwoDecimals(limit - count);
			limitString =
				diff >= 0 ? `${diff} to limit` : `<span class="text-red-600">${-diff} over limit 😢</span>`;
		}
	};

	onMount(() => {
		diffMsg();
	});
	afterUpdate(() => {
		diffMsg();
	});
</script>

<div class="relative m-2 text-center">
	<label for="countValue_{item.key}" class="text-2xl font-medium"
		>{(item?.emoji ? item?.emoji + ' ' : '') + item.name + ` (${item.unit})`}</label
	>
	<div class="mx-0 mb-1 grid w-auto grid-cols-2 font-normal md:mx-2">
		{#if !goalString && !limitString}
			<br />&nbsp;
		{:else}
			<span class="w-auto">
				{@html goalString}
			</span>
			<span class="w-auto">
				{@html limitString}
			</span>
		{/if}
	</div>
	<div class="m-auto flex w-[90vw] content-center items-center gap-0 md:w-auto">
		<button
			class="m-auto flex-auto grow-0 touch-manipulation appearance-none rounded-l-xl rounded-r-none border-none bg-slate-100 p-3 text-2xl transition duration-200 hover:rounded-l-xl hover:rounded-r-none hover:bg-neutral-300"
			on:click={decrement}
		>
			-{interval}
		</button>

		<input
			id="countValue_{item.key}"
			class="m-auto w-auto min-w-0 flex-[2_1_auto] flex-shrink touch-manipulation appearance-none rounded-none border-none p-3 text-2xl focus-visible:border-none"
			bind:value={count}
			type="number"
			min="0"
		/>

		<button
			class="m-auto flex-auto grow-0 touch-manipulation appearance-none rounded-l-none rounded-r-xl border-none bg-slate-100 p-3 text-2xl transition duration-200 hover:rounded-l-none hover:rounded-r-xl hover:bg-neutral-300"
			on:click={increment}
		>
			+{interval}
		</button>
	</div>

	<!-- Options -->
	<button
		class="absolute right-0 top-0 bg-transparent p-1 text-2xl text-[--fore-color] transition duration-200 hover:bg-transparent hover:text-neutral-200"
		on:click={() => (showOptions = !showOptions)}
		use:clickOutside={'#' + item.key + '_options'}
		on:click_outside={() => (showOptions = false)}
	>
		...
	</button>
	{#if showOptions}
		<span transition:fade={{ duration: 75 }}>
			<!-- <span transition:fade> -->
			<CounterOptions
				max={item?.countMax}
				key={item.key}
				bind:interval
				{moveUpCallback}
				{moveDownCallback}
			/>
		</span>
	{/if}
</div>

<style>
	input[type='number'] {
		appearance: textfield;
	}
</style>
