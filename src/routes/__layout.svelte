<script>
    import Helth from '../components/Helth.svelte';
</script>
<header>
    <Helth />
    <h1>helth app</h1>
</header>

<slot>

</slot>

<style>
    header {
        background-color: #34474c;
        position: sticky;
        display: flex;
        flex-direction: row;
        box-shadow: 0 0 10px black;
    }
</style>
