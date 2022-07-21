<script>
  import Counter from '../components/Counter.svelte';
  import { todayStore } from '../stores/local';
  let title = '🍗 protein (g)';
  let incr = 5;
</script>

<Counter {title} {incr} bind:count={$todayStore.protein}/>
