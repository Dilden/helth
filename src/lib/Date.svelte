<script>
	import { onMount } from 'svelte';
	import { today, history } from '$stores/stores';
	import { thePast } from '$utils/dates';
	import Spinner from '$lib/Spinner.svelte';
	import DatePicker from '$lib/misc/DatePicker.svelte';

	let dateObj;
	$: format = '';
	let edit = false;

	onMount(async () => {
		await today.init().then(() => {
			dateObj = new Date($today.date);
			format =
				dateObj.getUTCMonth() + 1 + '/' + dateObj.getUTCDate() + '/' + dateObj.getUTCFullYear();

			document.addEventListener('visibilitychange', () => {
				if (thePast(dateObj)) {
					document.location.reload();
				}
			});
		});
	});

	const callback = async (e) => {
		const changeTo = new Date(e.target.value).getTime();

		await today.setDate(changeTo);
		await today.init();

		dateObj = new Date($today.date);
		format =
			dateObj.getUTCMonth() + 1 + '/' + dateObj.getUTCDate() + '/' + dateObj.getUTCFullYear();

		edit = false;
	};
</script>

{#await Promise.all([today.init(), history.init()])}
	<Spinner />
{:then}
	<div class="text-center">
		{#if edit}
			<DatePicker {callback} />
		{:else}
			<h3 class="text-center"><button on:click={() => (edit = !edit)}>{format}</button></h3>
		{/if}
	</div>
{/await}
