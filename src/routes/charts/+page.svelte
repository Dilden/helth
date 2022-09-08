<script>
  import CalorieChart from '$components/charts/CalorieChart.svelte';
  import WaterChart from '$components/charts/WaterChart.svelte';
  import NutrientsChart from '$components/charts/NutrientsChart.svelte';
  import ProteinChart from '$components/charts/ProteinChart.svelte';
</script>

<div class='container'>
  <h2>charts 📈</h2>
  <CalorieChart />
  <WaterChart />
  <NutrientsChart />
  <ProteinChart />
</div>

<style>
    h2 {
      text-align: center;
    }
    .container {
      text-align: center;
    }
</style>
