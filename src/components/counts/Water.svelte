<script>
  import Counter from '$components/counts/Counter.svelte';
  import { settingStore, goalStore } from '$stores/local';
  import { today } from '$stores/stores';
  import Spinner from '$components/Spinner.svelte';

  let title = '💧 water (mL)';
  let max = 1000;
  $: diff = $goalStore.water - $today.water;
  $: diffString = (diff >= 0 ) ? diff + ' remaining' : -diff + ' over goal!';
</script>

{#await today.init()}
  <Spinner />
{:then}
  <Counter {title} {max} {diffString} bind:interval={$settingStore.waterInterval} bind:count={$today.water} />
{:catch error}
  <p>error</p>
{/await}
