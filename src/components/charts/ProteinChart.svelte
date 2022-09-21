<script>
  import Chart from '$components/charts/Chart.svelte';
  import { todayStore, historyStore, goalStore } from '$stores/local';

  let data = [
    {
      label: 'Protein',
      data: $historyStore.map(el => el.protein),
      backgroundColor: "#fce417",
      borderColor: "#fce417"
    }
    ]
  let labels = $historyStore.map(el => {
          let date = new Date(el.date);
          return date.toLocaleDateString();
      }
    );
  // push today onto data + labels
  data[0].data.push($todayStore.protein);
  labels.push('today');
</script>

<h3>Protein</h3>
<Chart chartType="line" {data} {labels} goal={$goalStore.protein} unit={'grams'} />
