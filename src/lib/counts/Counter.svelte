<script lang="ts">
	import { clickOutside } from '$utils/clickOutside';
	export let count: number;
	export let title: string;
	export let interval: number = 1;
	export let max: number = 100;
	export let diffString: string = '';

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
			class="m-auto min-w-0 flex-[2_1_auto] flex-shrink touch-manipulation appearance-none rounded-none border-none focus-visible:border-none p-3 text-2xl"
			bind:value={count}
			type="number"
			min="0"
		/>

		<button
			class="m-auto flex-auto grow-0 touch-manipulation appearance-none rounded-l-none rounded-r-xl border-none bg-slate-100 p-3 text-2xl transition duration-200 hover:rounded-l-none hover:rounded-r-xl hover:bg-neutral-300"
			on:click={increment}>
			+{interval}
		</button>
	</div>

  <!-- Options -->
  <button
    class="absolute right-0 top-0 bg-transparent hover:bg-transparent p-1 text-2xl text-[--fore-color] hover:text-neutral-200"
    on:click={() => (showOptions = !showOptions)}
    use:clickOutside={id + '_options'}
    on:click_outside|stopPropagation={() => showOptions = false}
  >
    ...
  </button>
  {#if showOptions}
    <div
      id={id + '_options'}
      class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
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
  {/if}
</div>

<style>
	input[type='number'] {
		appearance: textfield;
	}
</style>
