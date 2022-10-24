<script>
  import { onMount, afterUpdate } from 'svelte';
  import { today, settings, goals } from '$stores/stores';
  import Counter from '$components/counts/Counter.svelte';
  import Spinner from '$components/Spinner.svelte';

  let title = '💧 water (mL)';
  let max = 1000;
  $: diff = 0;
  $: diffString = `loading...`;
  
  const diffUpdate = () => {
    if('water' in $goals) {
      diff = $goals.water.value - $today.water;
      diffString = (diff >= 0 ) ? `${diff} remaining` : `${-diff} over goal!`;
    }
  }

  onMount(() => {
    goals.init()
    .then(() => {
      diffUpdate();
    })
  })
  afterUpdate(() => {
    diffUpdate();
  })
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
