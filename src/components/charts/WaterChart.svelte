<script>
  import Chart from '$components/charts/Chart.svelte';
  import { todayStore, historyStore, goalStore } from '$stores/local';

  let data = [
      {
        label: 'Water',
        data: $historyStore.map(el => el.water),
        backgroundColor: "#2417fc",
        borderColor: "#2417fc"
      }
    ];

  let labels = $historyStore.map(el => {
          let date = new Date(el.date);
          return date.toLocaleDateString();
      }
    );
  // push today onto data + labels
  data[0].data.push($todayStore.water);
  labels.push('today');
</script>

<h3>Water</h3>
<Chart chartType="line" goal={$goalStore.water} {data} {labels} unit={"ml"} />
