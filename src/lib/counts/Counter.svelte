<script lang="ts">
	import { clickOutside } from '$utils/clickOutside';
	import { toTwoDecimals } from '$utils/numbers';
	import { onMount, afterUpdate } from 'svelte';

	export let count: number;
	export let title: string;
	export let interval: number = 1;
	export let max: number = 100;
	export let limit = 0;
	export let goal = 0;

	const id = title.replace(/[\s()]/g, '');
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
	$: diffString = '<br />';

	const diffMsg = () => {
		let diff = 0;

		if (limit) {
			diff = toTwoDecimals(limit - count);
			diffString = diff >= 0 ? `${diff} remaining` : `${-diff} over limit 😢`;
		}
		if (goal) {
			diff = toTwoDecimals(goal - count);
			diffString = diff >= 0 ? `${diff} remaining` : `${-diff} over goal! 🥳`;
		}
	};

	onMount(() => {
		diffMsg();
	});
	afterUpdate(() => {
		diffMsg();
	});
</script>

<div class="relative my-2 text-center">
	<label for="countValue_{title}" class="text-2xl font-medium">{title}</label>
	<div class="mx-2 font-normal">{@html diffString}</div>
	<div class="flex content-center items-center gap-0">
		<button
			class="m-auto flex-auto grow-0 touch-manipulation appearance-none rounded-l-xl rounded-r-none border-none bg-slate-100 p-3 text-2xl transition duration-200 hover:rounded-l-xl hover:rounded-r-none hover:bg-neutral-300"
			on:click={decrement}
		>
			-{interval}
		</button>

		<input
			id="countValue_{title}"
			class="m-auto min-w-0 flex-[2_1_auto] flex-shrink touch-manipulation appearance-none rounded-none border-none p-3 text-2xl focus-visible:border-none"
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
		use:clickOutside={'#' + id + '_options'}
		on:click_outside={() => (showOptions = false)}
	>
		...
	</button>
	{#if showOptions}
		<div
			class="absolute right-2 top-[43px] h-0 w-0 border-8 border-t-[0px] border-solid border-transparent border-x-transparent border-y-gray-200"
		></div>
		<div
			id={id + '_options'}
			class="absolute right-0 top-[42px] z-10 mt-2 w-full origin-top-right rounded-md bg-gray-200 pt-2 text-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
			tabindex="-1"
		>
			<label for="interval_{title}" class="font-bold">Set -/+ interval: {interval}</label>
			<input
				class="mx-auto mb-2 w-11/12 p-0 text-5xl"
				aria-label="Adjust -/+ interval"
				id="interval_{title}"
				type="range"
				min="1"
				{max}
				bind:value={interval}
			/>
		</div>
	{/if}
</div>

<style>
	input[type='number'] {
		appearance: textfield;
	}
</style>
