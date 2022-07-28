<script>
    import Counter from '$components/counts/Counter.svelte';
    import { goalStore } from '$stores/local.js';

    let title = '💧 water (ml)';
</script>

<Counter {title} interval={500} max={1000} bind:count={$goalStore.water} />
