<script>
  import Counter from '$components/counts/Counter.svelte';
  import { settingStore, goalStore } from '$stores/local';
  import { today } from '$stores/stores';
  import Spinner from '$components/Spinner.svelte';

  let title = '🍗 protein (g)';
  $: diff = $goalStore.protein - $today.protein;
  $: diffString = (diff >= 0 ) ? diff + ' remaining' : -diff + ' over goal!';
</script>

{#await today.init()}
  <Spinner />
{:then}
  <Counter {title} {diffString} bind:interval={$settingStore.proteinInterval} bind:count={$today.protein}/>
{:catch error}
  <p>error</p>
{/await}
