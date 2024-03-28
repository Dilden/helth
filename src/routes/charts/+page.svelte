<script>
	import { list } from '$utils/nutrients';
	import { history, goals, limits } from '$stores/stores';
	import Chart from '$lib/charts/Chart.svelte';
	import Spinner from '$lib/Spinner.svelte';

	$: range = 7;
	const historyRange = [7, 14, 30, 90, 180, 365, 0];
	const colors = ['#fce417', '#ffffff', '#fc173e', '#2417fc'];
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
	{#await history.init() && goals.init() && limits.init()}
		<Spinner />
	{:then}
		{#each list as trackableItem, index}
			<h3>{trackableItem.name}</h3>
			{#key range}
				<Chart
					{range}
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
		{/each}
	{/await}
</div>
