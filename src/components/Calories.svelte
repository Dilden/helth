<script>
    import Counter from '../components/Counter.svelte';
    import {today} from '../stores/local';
    let title = '🍗';
</script>
<Counter title={title} bind:count={$today.calories}/>
