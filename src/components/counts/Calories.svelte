<script>
  import Counter from '$components/counts/Counter.svelte';
  import { todayStore, settingStore } from '$stores/local';
  let title = '⚡ calories';
</script>

<Counter {title} bind:interval={$settingStore.calorieInterval} bind:count={$todayStore.calories}/>
