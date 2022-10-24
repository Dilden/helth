<script>
  import Counter from '$components/counts/Counter.svelte';
  import { today, settings, goals } from '$stores/stores';
  import { afterUpdate } from 'svelte';
  import Spinner from '$components/Spinner.svelte';

  let title = '💧 water (mL)';
  let max = 1000;
  $: diff = 0;
  $: diffString = 'loading...';

  const updateDiff = () => {
    diff = $goals.water.value - $today.water;
    diffString = (diff >= 0 ) ? diff + ' remaining' : -diff + ' over goal!';
  }

  afterUpdate(() => {
    goals.init()
    .then(goalObj => {
      updateDiff();
    })
  });

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
