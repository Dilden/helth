<script>
	import { onMount } from 'svelte';
	import { today, history } from '$stores/stores';
	import { thePast, addTimezoneOffset, dateToPicker, utcToHuman, toUtc } from '$utils/dates';
	import { errorToast } from '$utils/toast';
	import Spinner from '$lib/Spinner.svelte';
	import DatePicker from '$lib/misc/DatePicker.svelte';

	let dateObj;
	$: format = '';
	let edit = false;

	onMount(async () => {
		await today.init().then(() => {
			dateObj = new Date($today.date);
			format = dateObj.getMonth() + 1 + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();

			document.addEventListener('visibilitychange', () => {
				if (thePast(dateObj)) {
					document.location.reload();
				}
			});
		});
	});

	const callback = async (e) => {
		const utc = new Date(e.target.value).getTime();
		if (utc > toUtc()) {
			errorToast('Selecting a date in the future is not allowed.');
		} else {
			const changeTo = addTimezoneOffset(utc);

			await today.setDate(changeTo);
			await today.init();

			format = utcToHuman(changeTo);

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
				on:click={async () => await callback({ target: { value: dateToPicker() } })}>Today</button
			>
			<button class="m-2" on:click={() => (edit = false)}>Cancel</button>
		{:else}
			<h3 class="text-center"><button on:click={() => (edit = !edit)}>{format}</button></h3>
		{/if}
	</div>
{/await}
