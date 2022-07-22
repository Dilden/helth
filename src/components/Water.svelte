<script>
  import Counter from '$components/Counter.svelte';
  import { todayStore } from '$stores/local';

  let title = '💧 water (mL)';
  let incr = 50;
  let max = 1000;
</script>

<Counter {title} {max} incr={incr} bind:count={$todayStore.water} />
