<script>
  import Counter from '$lib/counts/Counter.svelte';
  import { goals } from '$stores/stores';
  import Spinner from '$lib/Spinner.svelte';

  let title = '💧 water (ml)';
</script>

{#await goals.init()}
  <Spinner />
{:then}
  <Counter {title} interval={500} max={1000} bind:count={$goals.water.value} />
{:catch error}
  <p>error</p>
{/await}
