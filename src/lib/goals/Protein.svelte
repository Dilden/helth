<script>
  import Counter from '$lib/counts/Counter.svelte';
  import { goals } from '$stores/stores';
  import Spinner from '$lib/Spinner.svelte';
  let title = '🍗 protein (g)';
</script>

{#await goals.init()}
  <Spinner />
{:then}
  <Counter {title} bind:count={$goals.protein.value} interval={5} max={20} />
{:catch error}
  <p>error</p>
{/await}
