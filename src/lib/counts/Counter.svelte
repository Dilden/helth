<script lang="ts">
	import { clickOutside } from '$utils/clickOutside';
	import { toTwoDecimals } from '$utils/numbers';
	import { fade } from 'svelte/transition';
	import CounterOptions from './CounterOptions.svelte';

	interface Props {
		item: Nutrient;
		count?: number;
		interval?: number;
		limit?: number;
		goal?: number;
		moveUpCallback?: any;
		moveDownCallback?: any;
	}

	let {
		item,
		count = $bindable(0),
		interval = $bindable(1),
		limit = 0,
		goal = 0,
		moveUpCallback = () => {},
		moveDownCallback = () => {}
	}: Props = $props();

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

	let showOptions = $state(false);

	let goalString = $derived.by(() => {
		if (goal) {
			let diff = 0;
			diff = toTwoDecimals(goal - count);
			if (diff) {
				return diff >= 0
					? `${diff} to 🥅`
					: `<span class="text-teal-600">${-diff} over goal! 🥳</span>`;
			}
		}
		return '';
	});

	let limitString = $derived.by(() => {
		if (limit) {
			let diff = 0;
			diff = toTwoDecimals(limit - count);
			if (diff) {
				return diff >= 0
					? `${diff} to limit`
					: `<span class="text-red-600">${-diff} over limit 😢</span>`;
			}
		}
		return '';
	});
</script>

<div class="m-2 relative text-center">
	<label for="countValue_{item.key}" class="text-2xl font-medium"
		>{(item?.emoji ? item?.emoji + ' ' : '') + item.name + ` (${item.unit})`}</label
	>
	<div class="mx-0 mb-1 font-normal md:mx-2 grid w-auto grid-cols-2">
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
	<div class="gap-0 md:w-auto m-auto flex w-[90vw] content-center items-center">
		<button
			class="rounded-l-xl bg-slate-100 p-3 text-2xl hover:rounded-l-xl hover:bg-neutral-300 m-auto flex-auto grow-0 touch-manipulation appearance-none rounded-r-none border-none transition duration-200 hover:rounded-r-none"
			onclick={decrement}
		>
			-{interval}
		</button>

		<input
			id="countValue_{item.key}"
			class="min-w-0 p-3 text-2xl m-auto w-auto flex-[2_1_auto] flex-shrink touch-manipulation appearance-none rounded-none border-none focus-visible:border-none"
			bind:value={count}
			type="number"
			min="0"
		/>

		<button
			class="rounded-r-xl bg-slate-100 p-3 text-2xl hover:rounded-r-xl hover:bg-neutral-300 m-auto flex-auto grow-0 touch-manipulation appearance-none rounded-l-none border-none transition duration-200 hover:rounded-l-none"
			onclick={increment}
		>
			+{interval}
		</button>
	</div>

	<!-- Options -->
	<button
		class="right-0 top-0 p-1 text-2xl hover:text-neutral-200 absolute bg-transparent text-[--fore-color] transition duration-200 hover:bg-transparent"
		onclick={() => (showOptions = !showOptions)}
		use:clickOutside={'#' + item.key + '_options'}
		onclick_outside={() => (showOptions = false)}
	>
		...
	</button>
	{#if showOptions}
		<span transition:fade={{ duration: 75 }}>
			<div
				class="right-2 h-0 w-0 border-y-gray-200 absolute top-[40px] z-11 border-8 border-t-[0px] border-solid border-transparent border-x-transparent"
			></div>
			<div
				id={item.key + '_options'}
				class="right-0 mt-2 rounded-md bg-gray-200 pt-2 text-slate-700 shadow-xl ring-black ring-opacity-5 absolute top-[39px] z-10 w-full origin-top-right ring-1 focus:outline-none"
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="menu-button"
				tabindex="-1"
			>
				<CounterOptions
					max={item?.countMax}
					key={item.key}
					bind:interval
					{moveUpCallback}
					{moveDownCallback}
				/>
			</div>
		</span>
	{/if}
</div>

<style>
	input[type='number'] {
		appearance: textfield;
	}
</style>
