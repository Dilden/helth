<script>
  import Counter from '../components/Counter.svelte';
  import { todayStore, settingStore } from '../stores/local';
  let title = '⚡ calories';
</script>

<Counter {title} bind:incr={$settingStore.calorieIncr} bind:count={$todayStore.calories}/>
