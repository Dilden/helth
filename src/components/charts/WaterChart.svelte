<script>
  import { onMount } from 'svelte';
  import { history, goals } from '$stores/stores';
  import Chart from '$components/charts/Chart.svelte';
  import Spinner from '$components/Spinner.svelte';

  $: data = [];
  $: labels = [];

  onMount(() => {
    history.init()
    .then(() => {
      data = [
        {
          label: 'Water',
          data: $history.map(el => el.water),
          backgroundColor: "#2417fc",
          borderColor: "#2417fc"
        }
      ];

      labels = $history.map(el => {
            let date = new Date(el.date);
            return date.toLocaleDateString();
        }
      );
    })
  });

</script>

<h3>Water</h3>
{#await goals.init()}
  <Spinner />
{:then}
  <Chart chartType="line" goal={$goals.water.value} {data} {labels} unit={"ml"} />
{:catch error}
  <p>error</p>
{/await}
