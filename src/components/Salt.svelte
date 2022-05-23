<script>
    import Counter from '../components/Counter.svelte';
    import { todayStore } from '../stores/local';
    let title = '🧂';
</script>

<Counter {title} bind:count={$todayStore.salt} />
