<script>
	import { list } from '$utils/nutrients';
	import { history, goals, limits, settings } from '$stores/stores.svelte';
	import { onMount } from 'svelte';
	import Chart from '$lib/charts/Chart.svelte';
	import Spinner from '$lib/Spinner.svelte';

	let range = $state(7);
	const historyRange = [7, 14, 30, 90, 180, 365, 0];
	const colors = ['#fce417', '#ffffff', '#fc173e', '#2417fc'];

	let enabled = $derived.by(() => {
		if (settings.get() !== undefined) {
			return list
				.filter((item) => {
					if (settings.get()[item.key]?.value?.enabled) {
						item.position = settings.get()[item.key]?.value?.position;
						return item;
					}
				})
				.filter((val) => val !== undefined)
				.sort((a, b) => a.position - b.position);
		}
	});
</script>

<div class="text-center">
	<h2 class="text-center">📈 charts</h2>
	<div>
		<label for="chartRange">Show previous</label>
		<select id="chartRange" bind:value={range} class="max-w-max p-2">
			{#each historyRange as option}
				<option value={option}>{option ? `${option} entries` : 'all entries'}</option>
			{/each}
		</select>
	</div>
	{#await Promise.all([history.init(), goals.init(), limits.init(), settings.init()])}
		<Spinner />
	{:then}
		{#each enabled as trackableItem, index}
			{#if settings.get()[trackableItem.key].value.enabled}
				<h3>{trackableItem.name}</h3>
				{#key range}
					<Chart
						storeData={history
							.get()
							.map((el) => el[trackableItem.key])
							.slice(Number(-range))}
						labels={history
							.get()
							.map((el) => {
								let date = new Date(el.date);
								return date.toLocaleDateString();
							})
							.slice(Number(-range))}
						unit={trackableItem.unit}
						goal={goals.get()[trackableItem.key]?.value ? goals.get()[trackableItem.key]?.value : 0}
						limit={limits.get()[trackableItem.key]?.value
							? limits.get()[trackableItem.key]?.value
							: 0}
						color={colors[index % 4]}
					/>
				{/key}
			{/if}
		{/each}
	{/await}
</div>
