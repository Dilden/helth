<script>
  import Chart from '$components/charts/Chart.svelte';
  import { historyStore } from '$stores/local';

  let data = [
    {
      label: 'Protein',
      data: $historyStore.map(el => el.protein),
      backgroundColor: "#fce417",
      borderColor: "#fce417"
    },
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

<h3>Nutrients</h3>
<Chart chartType="line" {data} {labels} />
