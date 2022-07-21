<script>
  import Counter from '$components/Counter.svelte';
  import { todayStore } from '$stores/local';

  let title = '💧 water (mL)';
  let incr = 10;
</script>

<Counter {title} incr={incr} bind:count={$todayStore.water} />
