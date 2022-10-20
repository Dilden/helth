<script>
  import Counter from '$components/counts/Counter.svelte';
  import { settingStore, limitStore } from '$stores/local';
  import { today } from '$stores/stores';
  import Spinner from '$components/Spinner.svelte';

  let title = '⚡ calories';
  $: diff = $limitStore.calories - $today.calories;
  $: diffString = (diff >= 0 ) ? diff + ' remaining' : -diff + ' over limit 😢';
</script>

{#await today.init()}
  <Spinner />
{:then}
  <Counter {title} {diffString} bind:interval={$settingStore.calorieInterval} bind:count={$today.calories}/>
{:catch error}
  <p>error</p>
{/await}
