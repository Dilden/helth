<script>
  import Counter from '../components/Counter.svelte';
  import { todayStore, settingStore } from '../stores/local';
  let title = '🍗 protein (g)';
</script>

<Counter {title} bind:interval={$settingStore.proteinInterval} bind:count={$todayStore.protein}/>
