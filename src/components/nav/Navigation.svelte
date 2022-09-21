<script>
    import Helth from '$components/Helth.svelte';
    import Menu from '$components/nav/Menu.svelte';
</script>

<header>
    <Helth />
    <Menu />
</header>

<style>
    header {
        background-color: var(--back-color);
        position: sticky;
        max-height: 110px;
    }
</style>
