<script lang="ts">
	export let count: number;
	export let title: string;
	export let interval: number = 1;
	export let max: number = 100;
	export let diffString: string = '';

	function increment(): number {
		return (count = count + interval);
	}
	function decrement(): number {
		count = count - interval;
		if (count <= 0) {
			count = 0;
		}
		return count;
	}
</script>

<div class="text-center">
	<label for="countValue_{title}" class="text-2xl font-medium">{title}</label>
	<div class="mx-2 font-normal">{@html diffString}</div>
	<div class="flex content-center items-center gap-0">
		<button
			class="m-auto flex-auto grow-0 touch-manipulation appearance-none rounded-l-xl rounded-r-none border-none bg-slate-100 p-3 text-2xl transition duration-200 hover:bg-neutral-300"
			on:click={decrement}
		>
			-{interval}
		</button>

		<input
			id="countValue_{title}"
			class="m-auto min-w-0 flex-[2_1_auto] flex-shrink touch-manipulation appearance-none rounded-none border-none p-3 text-2xl"
			bind:value={count}
			type="number"
			min="0"
		/>

		<button
			class="m-auto flex-auto grow-0 touch-manipulation appearance-none rounded-l-none rounded-r-xl border-none bg-slate-100 p-3 text-2xl transition duration-200 hover:bg-neutral-300"
			on:click={increment}
		>
			+{interval}
		</button>
	</div>
	<input
		class="mx-auto my-2 w-11/12 p-0 text-5xl"
		aria-label="Adjust interval for {title}"
		id="interval_{title}"
		type="range"
		min="1"
		{max}
		bind:value={interval}
	/>
</div>

<style>
	input[type='number'] {
		appearance: textfield;
	}
</style>
