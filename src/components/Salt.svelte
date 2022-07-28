<script>
    import Counter from '../components/Counter.svelte';
  import { todayStore, settingStore } from '../stores/local';
    let title = '🧂 sodium (mg)';
</script>

<Counter {title} bind:incr={$settingStore.sodiumIncr} bind:count={$todayStore.salt} />
