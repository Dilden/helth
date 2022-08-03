<script>
  import Counter from '$components/counts/Counter.svelte';
  import { todayStore, settingStore, limitStore } from '$stores/local';
  let title = '⚡ calories';
  $: diff = $limitStore.calories - $todayStore.calories;
  $: diffString = (diff >= 0 ) ? diff + ' remaining' : -diff + ' over limit 😢';
</script>

<Counter {title} {diffString} bind:interval={$settingStore.calorieInterval} bind:count={$todayStore.calories}/>
