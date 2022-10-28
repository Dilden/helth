<script>
  import Counter from '$components/counts/Counter.svelte';
  import { limits } from '$stores/stores';
  import Spinner from '$components/Spinner.svelte';
  let title = '⚡ calories';
</script>

{#await limits.init()}
  <Spinner />
{:then}
  <Counter {title} bind:count={$limits.calories.value} interval={200} max={600} />
{:catch error}
  <p>error</p>
{/await}
