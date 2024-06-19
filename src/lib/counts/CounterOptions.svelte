<script>
	import { settings } from '$stores/stores';
	export let key = '';
	export let interval = 0;
	export let max = 100;

	export let moveUpCallback = (fn) => {
		fn();
	};

	export let moveDownCallback = (fn) => {
		fn();
	};
</script>

<div class="flex flex-auto justify-around">
	<!-- <button class="text-[#26B170] hover:text-slate-100" type="button" on:click={moveUpCallback} -->
	<button type="button" on:click={moveUpCallback}>⬆️ Move Up</button>
	<button type="button" on:click={moveDownCallback}>⬇️ Move Down</button>
</div>
<label for="interval_{key}" class="font-bold">Set -/+ interval: {interval}</label>
<input
	class="mx-auto block w-11/12 p-0 text-5xl"
	aria-label="Adjust -/+ interval"
	id="interval_{key}"
	type="range"
	min="1"
	{max}
	bind:value={interval}
/>
<label for="enabled_{key}" class="font-bold">Show this counter?</label>
<input
	type="checkbox"
	id="enabled_{key}"
	bind:checked={$settings[key].value.enabled}
	class="m-1 mb-3 p-2"
/>
