<script>
  import Counter from '$components/Counter.svelte';
  import { todayStore, settingStore } from '../stores/local';

  let title = '💧 water (mL)';
  let max = 1000;
</script>

<Counter {title} {max} bind:incr={$settingStore.waterInterval} bind:count={$todayStore.water} />
