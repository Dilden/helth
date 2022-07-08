<script>
  import CalorieChart from '$components/charts/CalorieChart.svelte';
  import WaterChart from '$components/charts/WaterChart.svelte';
</script>

<h2>history 📈</h2>
<div class='charts'>
  <div class='container'>
    <CalorieChart />
  </div>
  <div class='container'>
    <WaterChart />
  </div>
</div>

<style>
    h2 {
        text-align: center;
    }
    .charts {
      text-align: center;
    }
    .container {
        width: 500px;
        height: auto;
        text-align: center;
        margin: 0 auto;
        display: inline-block;
    }
</style>
