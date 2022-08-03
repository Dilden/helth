<script>
  import Counter from '$components/counts/Counter.svelte';
  import { todayStore, settingStore, goalStore } from '$stores/local';

  let title = '💧 water (mL)';
  let max = 1000;
  $: diff = $goalStore.water - $todayStore.water;
  $: diffString = (diff >= 0 ) ? diff + ' remaining' : -diff + ' over goal!';
</script>

<Counter {title} {max} {diffString} bind:interval={$settingStore.waterInterval} bind:count={$todayStore.water} />
