<script>
    import Counter from '../Counter.svelte';
    import { limitStore } from '$stores/local.js';
    let title = '🧂';
</script>

<Counter {title} bind:count={$limitStore.salt} />
