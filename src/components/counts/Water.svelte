<script>
  import Counter from '$components/counts/Counter.svelte';
  import { settingStore, goalStore } from '$stores/local';
  import { today, settings } from '$stores/stores';
  import Spinner from '$components/Spinner.svelte';

  let title = '💧 water (mL)';
  let max = 1000;
  $: diff = $goalStore.water - $today.water;
  $: diffString = (diff >= 0 ) ? diff + ' remaining' : -diff + ' over goal!';
</script>

{#await today.init()}
  <Spinner />
{:then}
  {#await settings.init()}
    <Spinner />
  {:then}
    <Counter {title} {max} {diffString} bind:interval={$settings.waterInterval.value} bind:count={$today.water} />
  {/await}
{:catch error}
  <p>error</p>
{/await}
