<script>
  import { history, limits } from '$stores/stores';
  import Chart from '$components/charts/Chart.svelte';
  import Spinner from '$components/Spinner.svelte';

  const data = () => {
    return [
    {
      label: 'Sodium',
      data: $history.map(el => el.sodium),
      backgroundColor: "#ffffff",
      borderColor: "#ffffff"
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

<h3>Sodium</h3>
{#await history.init()}
  <Spinner />
{:then}
  {#await limits.init()}
  <Spinner />
  {:then}
    <Chart chartType="line" data={data()} labels={labels()} limit={$limits.sodium.value} unit={'mg'} />
  {/await}
{:catch error}
  <p>error</p>
{/await}
