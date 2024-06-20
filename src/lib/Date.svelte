<script>
	import { onMount } from 'svelte';
	import { today } from '$stores/stores';
	import { thePast } from '$utils/dates';
	import Spinner from '$lib/Spinner.svelte';
	import DatePicker from '$lib/misc/DatePicker.svelte';

	let dateObj, format;
	let edit = false;

	onMount(() => {
		today.init().then(() => {
			dateObj = new Date($today.date);
			format = dateObj.getMonth() + 1 + '/' + dateObj.getDate() + '/' + dateObj.getFullYear();

			document.addEventListener('visibilitychange', () => {
				if (thePast(dateObj)) {
					document.location.reload();
				}
			});
		});
	});

	const callback = () => {
		edit = false;
	};
</script>

{#await today.init()}
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
