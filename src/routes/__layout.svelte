<script>
    import Navigation from '../components/Navigation.svelte';
</script>

<header>
    <Navigation />
</header>

<slot>

</slot>

<style>
    header {
        background-color: #34474c;
        position: sticky;
        box-shadow: 0 0 10px black;
    }
</style>
