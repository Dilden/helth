<script>
  import Chart from '$components/charts/Chart.svelte';
  import { historyStore, limitStore } from '$stores/local';

  let data = [
    {
      label: 'Salt',
      data: $historyStore.map(el => el.salt),
      backgroundColor: "#ffffff",
      borderColor: "#ffffff"
    }
    ]
  let labels = $historyStore.map(el => {
          let date = new Date(el.date);
          return date.toLocaleDateString();
      }
    );
</script>

<h3>Sodium</h3>
<Chart chartType="line" {data} {labels} goal={$limitStore.salt} unit={'mg'} />
