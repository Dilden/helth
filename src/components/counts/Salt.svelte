<script>
  import Counter from '$components/counts/Counter.svelte';
  import { settingStore, limitStore } from '$stores/local';
  import { today, settings } from '$stores/stores';
  import Spinner from '$components/Spinner.svelte';

  let title = '🧂 sodium (mg)';
  $: diff = $limitStore.salt - $today.salt;
  $: diffString = (diff >= 0 ) ? diff + ' remaining' : -diff + ' over limit 😢';
</script>

{#await today.init()}
  <Spinner />
{:then}
  {#await settings.init()}
    <Spinner />
  {:then}
    <Counter {title} {diffString} bind:interval={$settings.sodiumInterval.value} bind:count={$today.salt} />
  {/await}
{:catch error}
  <p>error</p>
{/await}
