<script>
    import Counter from '$components/counts/Counter.svelte';
    import { limitStore } from '$stores/local.js';
    let title = '🧂 sodium (mg)';
</script>

<Counter {title} bind:count={$limitStore.salt} />
