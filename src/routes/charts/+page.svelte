<script>
	import { list } from '$utils/nutrients';
	import { history, goals, limits, settings } from '$stores/stores';
	import { onMount, afterUpdate } from 'svelte';
	import Chart from '$lib/charts/Chart.svelte';
	import Spinner from '$lib/Spinner.svelte';

	$: range = 7;
	const historyRange = [7, 14, 30, 90, 180, 365, 0];
	const colors = ['#fce417', '#ffffff', '#fc173e', '#2417fc'];

	$: enabled = list;
	onMount(async () => {
		await settings.init();
		setEnabledItems();
	});
	afterUpdate(() => {
		setEnabledItems();
	});

	const setEnabledItems = () => {
		if ($settings !== undefined) {
			enabled = list
				.filter((item) => {
					if ($settings[item.key]?.value?.enabled) {
						item.position = $settings[item.key]?.value?.position;
						return item;
					}
				})
				.filter((val) => val !== undefined)
				.sort((a, b) => a.position - b.position);
		}
	};
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
			{#if $settings[trackableItem.key].value.enabled}
				<h3>{trackableItem.name}</h3>
				{#key range}
					<Chart
						storeData={$history.map((el) => el[trackableItem.key]).slice(Number(-range))}
						labels={$history
							.map((el) => {
								let date = new Date(el.date);
								return date.toLocaleDateString();
							})
							.slice(Number(-range))}
						unit={trackableItem.unit}
						goal={$goals[trackableItem.key]?.value ? $goals[trackableItem.key]?.value : 0}
						limit={$limits[trackableItem.key]?.value ? $limits[trackableItem.key]?.value : 0}
						color={colors[index % 4]}
					/>
				{/key}
			{/if}
		{/each}
	{/await}
</div>
