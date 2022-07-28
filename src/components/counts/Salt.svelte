<script>
    import Counter from '$components/counts/Counter.svelte';
  import { todayStore, settingStore } from '$stores/local';
    let title = '🧂 sodium (mg)';
</script>

<Counter {title} bind:interval={$settingStore.sodiumInterval} bind:count={$todayStore.salt} />
