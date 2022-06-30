<script>
  import Counter from '../components/Counter.svelte';
  import { todayStore } from '../stores/local';
  let title = '🍗 protein (g)';
</script>

<Counter {title} bind:count={$todayStore.protein}/>
