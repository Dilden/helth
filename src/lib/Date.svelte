<script lang="ts">
	import { today, history } from '$stores/stores.svelte';
	import { addTimezoneOffset, dateToPicker, toUtc } from '$utils/dates';
	import { errorToast } from '$utils/toast';
	import Spinner from '$lib/Spinner.svelte';
	import DatePicker from '$lib/misc/DatePicker.svelte';

	$inspect(today.get());
	let dateObj = $derived(new Date(today.get().date));
	let format = $derived(
		dateObj.getMonth() + 1 + '/' + dateObj.getDate() + '/' + dateObj.getFullYear()
	);
	let edit = $state(false);

	const callback = async (e: Event): Promise<void> => {
		const tar = e.target as HTMLInputElement;
		if (!tar.value) {
			tar.value = dateToPicker();
		}
		const utc = new Date(tar.value).getTime();
		if (utc > toUtc()) {
			errorToast('Selecting a date in the future is not allowed.');
		} else {
			const changeTo = addTimezoneOffset(utc);

			await today.setDate(changeTo.toString());
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
			<button class="m-2" onclick={callback}>Today</button>
			<button class="m-2" onclick={() => (edit = false)}>Cancel</button>
		{:else}
			<h3 class="text-center"><button onclick={() => (edit = !edit)}>{format}</button></h3>
		{/if}
	</div>
{/await}
