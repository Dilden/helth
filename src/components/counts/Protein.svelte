<script>
  import Counter from '$components/counts/Counter.svelte';
  import { todayStore, settingStore, goalStore } from '$stores/local';
  let title = '🍗 protein (g)';
  $: diff = $goalStore.protein - $todayStore.protein;
  $: diffString = (diff >= 0 ) ? diff + ' remaining' : -diff + ' over goal!';
</script>

<Counter {title} {diffString} bind:interval={$settingStore.proteinInterval} bind:count={$todayStore.protein}/>
