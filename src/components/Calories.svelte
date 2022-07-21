<script>
  import Counter from '../components/Counter.svelte';
  import { todayStore } from '../stores/local';
  let title = '⚡ calories';
  let incr = 75;
</script>

<Counter {title} {incr} bind:count={$todayStore.calories}/>
