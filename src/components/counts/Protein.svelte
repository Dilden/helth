<script>
  import Counter from '$components/counts/Counter.svelte';
  import { settingStore, goalStore } from '$stores/local';
  import { today, settings } from '$stores/stores';
  import Spinner from '$components/Spinner.svelte';

  let title = '🍗 protein (g)';
  $: diff = $goalStore.protein - $today.protein;
  $: diffString = (diff >= 0 ) ? diff + ' remaining' : -diff + ' over goal!';
</script>

{#await today.init()}
  <Spinner />
{:then}
  {#await settings.init()}
    <Spinner />
  {:then}
    <Counter {title} {diffString} bind:interval={$settings.proteinInterval.value} bind:count={$today.protein}/>
  {/await}
{:catch error}
  <p>error</p>
{/await}
