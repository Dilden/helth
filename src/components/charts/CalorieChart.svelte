<script>
  import Chart from '$components/charts/Chart.svelte';
  import { historyStore } from '$stores/local';

  let data = [
    {
      label: 'Calories',
      data: $historyStore.map(el => el.calories),
      backgroundColor: "#fc173e",
      borderColor: "#fc173e"
    }];
  let labels = $historyStore.map(el => new Date( el.date ).getDate() + '/' + new Date( el.date ).getMonth() + '/' + new Date( el.date ).getFullYear());
</script>

<h3>Calories</h3>
<Chart chartType="line" data={data} labels={labels} color='#fc173e'/>
