<script>
    import Helth from '../components/Helth.svelte';
    import {
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        NavLink
    } from 'sveltestrap/src';

    let isOpen = false;
    const toggle = () => (isOpen = !isOpen);
</script>
<header>
    <Navbar color="dark">
        <NavbarBrand class="me-auto">
            <Helth />
        </NavbarBrand>
        <NavbarToggler on:click={toggle} class="me-2"></NavbarToggler>
        <Collapse {isOpen} navbar>
            <Nav>
                <NavItem>
                    <NavLink href="#components/">Components</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="https://github.com/bestguy/sveltestrap">GitHub</NavLink>
                </NavItem>
            </Nav>
        </Collapse>
    </Navbar>
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
