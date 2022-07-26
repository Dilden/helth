<script>
    import Helth from '$components/Helth.svelte';
    import Menu from '$components/Nav/Menu.svelte';
</script>

<header>
    <Helth />
    <Menu />
</header>

<style>
    header {
        background-color: #34474c;
        position: sticky;
        box-shadow: 0 0 25px black;
        max-height: 110px;
    }
</style>
