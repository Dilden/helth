<script>
	import { settings } from '$stores/stores';

	/** @type {{key?: string, interval?: number, max?: number, moveUpCallback?: any, moveDownCallback?: any}} */
	let {
		key = '',
		interval = $bindable(0),
		max = 100,
		moveUpCallback = (fn) => {
			fn();
		},
		moveDownCallback = (fn) => {
			fn();
		}
	} = $props();
</script>

<div class="flex flex-auto justify-around">
	<!-- <button class="text-[#26B170] hover:text-slate-100" type="button" on:click={moveUpCallback} -->
	<button type="button" onclick={moveUpCallback}>⬆️ Move Up</button>
	<button type="button" onclick={moveDownCallback}>⬇️ Move Down</button>
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
