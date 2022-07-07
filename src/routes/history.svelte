<script>
  import CalorieChart from '$components/charts/CalorieChart.svelte';
</script>

<h2>history 📈</h2>
<div class="container">
  <CalorieChart />
</div>

<style>
    h2 {
        text-align: center;
    }
    .container {
        width: 500px;
        height: auto;
        text-align: center;
        margin: 0 auto;
    }
</style>
