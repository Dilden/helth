<script lang="ts">
	export let key: string = '';
	export let interval: number = 0;
	export let max: number = 100;
</script>

<div
	class="absolute right-2 top-[43px] h-0 w-0 border-8 border-t-[0px] border-solid border-transparent border-x-transparent border-y-gray-200"
></div>
<div
	id={key + '_options'}
	class="absolute right-0 top-[42px] z-10 mt-2 w-full origin-top-right rounded-md bg-gray-200 pt-2 text-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
	role="menu"
	aria-orientation="vertical"
	aria-labelledby="menu-button"
	tabindex="-1"
>
	<label for="interval_{key}" class="font-bold">Set -/+ interval: {interval}</label>
	<input
		class="mx-auto w-11/12 p-0 text-5xl"
		aria-label="Adjust -/+ interval"
		id="interval_{key}"
		type="range"
		min="1"
		{max}
		bind:value={interval}
	/>
	<label for="enabled_{key}" class="font-bold">Hide</label>
	<input type="checkbox" id="enabled_{key}" class="m-1 mb-3 p-2" />
</div>
