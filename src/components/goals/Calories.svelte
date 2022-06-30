<script>
    import Counter from '$components/Counter.svelte';
    import { limitStore } from '$stores/local';
    let title = '⚡ calories';
</script>

<Counter {title} bind:count={$limitStore.calories} />
