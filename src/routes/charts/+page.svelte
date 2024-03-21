<script>
	import WaterChart from '$lib/charts/WaterChart.svelte';
	import CalorieChart from '$lib/charts/CalorieChart.svelte';
	import NutrientsChart from '$lib/charts/NutrientsChart.svelte';
	import ProteinChart from '$lib/charts/ProteinChart.svelte';

	$: range = 7;
	const historyRange = [7, 30, 90, 365, 0];
</script>

<div class="text-center">
	<h2>📈 charts</h2>
	<div>
		<label for="chartRange">Show previous</label>
		<select id="chartRange" value={range} class="max-w-max">
			{#each historyRange as option}
				<option value={option}>{option ? `${option} days` : 'All history'}</option>
			{/each}
		</select>
	</div>
	<WaterChart {range} />
	<CalorieChart />
	<NutrientsChart />
	<ProteinChart />
</div>

<style>
	h2 {
		text-align: center;
	}
</style>
