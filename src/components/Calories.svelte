<script>
  import Counter from '../components/Counter.svelte';
  import { todayStore } from '../stores/local';
  let title = '⚡ calories';
</script>

<Counter {title} bind:count={$todayStore.calories}/>
