<script>
  import { history, limits } from '$stores/stores';
  import Chart from '$lib/charts/Chart.svelte';
  import Spinner from '$lib/Spinner.svelte';

  const data = () => {
    return [
    {
      label: 'Calories',
      data: $history.map(el => el.calories),
      backgroundColor: "#fc173e",
      borderColor: "#fc173e"
    }];
  } 
  const labels = () => {
    return $history.map(el => {
          let date = new Date(el.date);
          return date.toLocaleDateString();
      }
    );
  } 
</script>

<h3>Calories</h3>
{#await history.init()}
  <Spinner />
{:then}
  {#await limits.init()}
  <Spinner />
  {:then}
    <Chart chartType="line" data={data()} limit={$limits.calories.value} labels={labels()} />
  {/await}
{:catch error}
  <p>error</p>
{/await}
