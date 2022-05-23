<script>
    import Counter from '$components/Counter.svelte';
    import { goalStore } from '$stores/local.js';

    let title = '💧';
</script>

<Counter {title} bind:count={$goalStore.water} />
