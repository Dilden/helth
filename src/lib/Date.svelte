<script>
	import { onMount } from 'svelte';
	import { history } from '$stores/stores';
	import { today } from '$stores/stores.svelte';
	import { thePast, addTimezoneOffset, dateToPicker, utcToHuman, toUtc } from '$utils/dates';
	import { errorToast } from '$utils/toast';
	import Spinner from '$lib/Spinner.svelte';
	import DatePicker from '$lib/misc/DatePicker.svelte';

	let dateObj = $derived(new Date(today.get().date));
	let format = $derived(
		dateObj.getMonth() + 1 + '/' + dateObj.getDate() + '/' + dateObj.getFullYear()
	);
	let edit = $state(false);

	const callback = async (e) => {
		const utc = new Date(e.target.value).getTime();
		if (utc > toUtc()) {
			errorToast('Selecting a date in the future is not allowed.');
		} else {
			const changeTo = addTimezoneOffset(utc);

			await today.setDate(changeTo);
			await today.init();

			edit = false;
		}
	};
</script>

{#await Promise.all([today.init(), history.init()])}
	<Spinner />
{:then}
	<div class="text-center">
		{#if edit}
			<DatePicker {callback} />
			<br />
			<button
				class="m-2"
				onclick={async () => await callback({ target: { value: dateToPicker() } })}>Today</button
			>
			<button class="m-2" onclick={() => (edit = false)}>Cancel</button>
		{:else}
			<h3 class="text-center"><button onclick={() => (edit = !edit)}>{format}</button></h3>
		{/if}
	</div>
{/await}
