<script>
    import Counter from '../components/Counter.svelte';
    import { todayStore } from '../stores/local';
    let title = '🧂 sodium (mg)';
    let incr = 10;
</script>

<Counter {title} {incr} bind:count={$todayStore.salt} />
