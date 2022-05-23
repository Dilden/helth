<script>
    import Counter from '$components/Counter.svelte';
    import { limitStore } from '$stores/local';
    let title = '🍗';
</script>

<Counter {title} bind:count={$limitStore.calories} />
