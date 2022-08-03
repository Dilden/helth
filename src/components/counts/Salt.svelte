<script>
  import Counter from '$components/counts/Counter.svelte';
  import { todayStore, settingStore, limitStore } from '$stores/local';
  let title = '🧂 sodium (mg)';
  $: diff = $limitStore.salt - $todayStore.salt;
  $: diffString = (diff >= 0 ) ? diff + ' remaining' : -diff + ' over limit 😢';
</script>

<Counter {title} {diffString} bind:interval={$settingStore.sodiumInterval} bind:count={$todayStore.salt} />
