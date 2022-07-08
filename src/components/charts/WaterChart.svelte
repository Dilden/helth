<script>
  import Chart from '$components/charts/Chart.svelte';
  import { historyStore } from '$stores/local';

  let data = [
      {
        label: 'Water',
        data: $historyStore.map(el => el.water),
        backgroundColor: "#2417fc",
        borderColor: "#2417fc"
      }
    ];
  let labels = $historyStore.map(el => new Date( el.date ).getDate() + '/' + new Date( el.date ).getMonth() + '/' + new Date( el.date ).getFullYear());
</script>

<h3>Water</h3>
<Chart chartType="line" data={data} labels={labels} />
