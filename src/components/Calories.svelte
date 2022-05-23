<script>
    import Counter from '../components/Counter.svelte';
    import {todayStore} from '../stores/local';
    let title = '🍗';
</script>
<Counter title={title} bind:count={$todayStore.calories}/>
