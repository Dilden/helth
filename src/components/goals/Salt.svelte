<script>
  import Counter from '$components/counts/Counter.svelte';
  import { limits } from '$stores/stores';
  import Spinner from '$components/Spinner.svelte';
  let title = '🧂 sodium (mg)';
</script>

{#await limits.init()}
  <Spinner />
{:then}
  <Counter {title} bind:count={$limits.sodium.value} interval={25} max={100} />
{:catch error}
  <p>error</p>
{/await}
