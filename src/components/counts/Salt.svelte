<script>
  import { onMount, afterUpdate } from 'svelte';
  import { today, settings, limits } from '$stores/stores';
  import Counter from '$components/counts/Counter.svelte';
  import Spinner from '$components/Spinner.svelte';

  let title = '🧂 sodium (mg)';
  $: diff = 0;
  $: diffString = 'loading...';

  const diffUpdate = () => {
    if('sodium' in $limits) {
      diff = $limits.sodium.value - $today.sodium;
      diffString = (diff >= 0 ) ? `${diff} remaining` : `${-diff} over limit 😢`;
    }
  }
  onMount(() => {
    limits.init()
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
    <Counter {title} {diffString} bind:interval={$settings.sodiumInterval.value} bind:count={$today.sodium} />
  {/await}
{:catch error}
  <p>error</p>
{/await}
