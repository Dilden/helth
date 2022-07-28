<script>
  import Counter from '../components/Counter.svelte';
  import { todayStore, settingStore } from '../stores/local';
  let title = '⚡ calories';
</script>

<Counter {title} bind:incr={$settingStore.calorieInterval} bind:count={$todayStore.calories}/>
