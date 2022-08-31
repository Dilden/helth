<script>
  import Chart from '$components/charts/Chart.svelte';
  import { historyStore, limitStore } from '$stores/local';

  let data = [
    {
      label: 'Calories',
      data: $historyStore.map(el => el.calories),
      backgroundColor: "#fc173e",
      borderColor: "#fc173e"
    }];
  let labels = $historyStore.map(el => {
          let date = new Date(el.date);
          return date.toLocaleDateString();
      }
    );
</script>

<h3>Calories</h3>
<Chart chartType="line" {data} limit={$limitStore.calories} {labels} />
