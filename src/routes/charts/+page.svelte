<script>
  import WaterChart from '$lib/charts/WaterChart.svelte';
  import CalorieChart from '$lib/charts/CalorieChart.svelte';
  import NutrientsChart from '$lib/charts/NutrientsChart.svelte';
  import ProteinChart from '$lib/charts/ProteinChart.svelte';
</script>

<div class="text-center">
  <h2>📈 charts</h2>
  <WaterChart />
  <CalorieChart />
  <NutrientsChart />
  <ProteinChart />
</div>

<style>
    h2 {
      text-align: center;
    }
</style>
