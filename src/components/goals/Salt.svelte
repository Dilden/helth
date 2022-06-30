<script>
    import Counter from '../Counter.svelte';
    import { limitStore } from '$stores/local.js';
    let title = '🧂 sodium (mg)';
</script>

<Counter {title} bind:count={$limitStore.salt} />
