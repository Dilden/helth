<script>
  import Chart from '$components/charts/Chart.svelte';
  import { todayStore, historyStore, limitStore } from '$stores/local';

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
  // push today onto data + labels
  data[0].data.push($todayStore.salt);
  labels.push('today');
</script>

<h3>Sodium</h3>
<Chart chartType="line" {data} {labels} limit={$limitStore.salt} unit={'mg'} />
