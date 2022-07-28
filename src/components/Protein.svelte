<script>
  import Counter from '../components/Counter.svelte';
  import { todayStore, settingStore } from '../stores/local';
  let title = '🍗 protein (g)';
</script>

<Counter {title} bind:incr={$settingStore.proteinIncr} bind:count={$todayStore.protein}/>
