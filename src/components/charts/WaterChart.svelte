<script>
  import Chart from '$components/charts/Chart.svelte';
  import { historyStore } from '$stores/local';

  let data = $historyStore.map(el => el.water);
  let labels = $historyStore.map(el => new Date( el.date ).getDate() + '/' + new Date( el.date ).getMonth() + '/' + new Date( el.date ).getFullYear());
</script>

<Chart chartType="line" data={data} labels={labels} title='Water' color="#2417fc"/>
