<script>
    import Counter from '../components/Counter.svelte';
    import { todayStore } from '../stores/local';
    let title = '🧂 sodium (mg)';
</script>

<Counter {title} bind:count={$todayStore.salt} />
