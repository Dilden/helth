<script>
  import CalorieChart from '$components/charts/CalorieChart.svelte';
  import WaterChart from '$components/charts/WaterChart.svelte';
  import NutrientsChart from '$components/charts/NutrientsChart.svelte';
</script>

<div class='container'>
  <h2>history 📈</h2>
  <div class='chart'>
    <CalorieChart />
  </div>
  <div class='chart'>
    <WaterChart />
  </div>
  <div class='chart'>
    <NutrientsChart />
  </div>
</div>

<style>
    h2 {
        text-align: center;
    }
    .container {
      text-align: center;
    }
    .chart {
        width: 500px;
        height: auto;
        text-align: center;
        margin: 0 auto;
        display: inline-block;
    }
</style>
