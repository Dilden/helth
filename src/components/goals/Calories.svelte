<script>
    import Counter from '$components/counts/Counter.svelte';
    import { limitStore } from '$stores/local';
    let title = '⚡ calories';
</script>

<Counter {title} bind:count={$limitStore.calories} interval={200} max={600} />
