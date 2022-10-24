<script>
  import { onMount, afterUpdate } from 'svelte';
  import { today, settings, goals } from '$stores/stores';
  import Counter from '$components/counts/Counter.svelte';
  import Spinner from '$components/Spinner.svelte';

  let title = '🍗 protein (g)';

  $: diff = 0;
  $: diffString = 'loading...';


  const diffUpdate = () => {
    if('protein' in $goals) {
      diff = $goals.protein.value - $today.protein;
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
    <Counter {title} {diffString} bind:interval={$settings.proteinInterval.value} bind:count={$today.protein}/>
  {/await}
{:catch error}
  <p>error</p>
{/await}
