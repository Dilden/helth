<script>
    import Helth from '$lib/nav/Helth.svelte';
    import Menu from '$lib/nav/Menu.svelte';
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
        z-index: 10;
    }
</style>
