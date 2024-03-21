<script>
	import WaterChart from '$lib/charts/WaterChart.svelte';
	import CalorieChart from '$lib/charts/CalorieChart.svelte';
	import NutrientsChart from '$lib/charts/NutrientsChart.svelte';
	import ProteinChart from '$lib/charts/ProteinChart.svelte';

	$: range = 7;
	const historyRange = [7, 14, 30, 90, 180, 365, 0];
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
	{#key range}
		<WaterChart {range} />
		<CalorieChart {range} />
		<NutrientsChart {range} />
		<ProteinChart {range} />
	{/key}
</div>
