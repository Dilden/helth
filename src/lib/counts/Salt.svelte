<script>
  import { onMount, afterUpdate } from 'svelte';
  import { today, settings, limits } from '$stores/stores';
  import Counter from '$lib/counts/Counter.svelte';
  import Spinner from '$lib/Spinner.svelte';

  let title = '🧂 sodium (mg)';
  $: diff = 0;
  $: diffString = 'loading...';

  const diffUpdate = () => {
    if('sodium' in $limits) {
      diff = $limits.sodium.value - $today.sodium;
      diffString = (diff >= 0 ) ? `${diff} remaining` : `${-diff} over limit 😢`;
    }
    else {
      diffString = `<a data-sveltekit-reload href='/'>Oops! Click to refresh</a>`;
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
  {:catch error}
    <p>Settings error: {error}</p>
  {/await}
{:catch error}
  <p>Error creating 'today': {error}</p>
{/await}
