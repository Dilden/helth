<script>
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'sveltestrap/src';
  import Helth from '../components/Helth.svelte';

  let isOpen = false;
  const toggle = () => (isOpen = !isOpen);
</script>

<Navbar color="dark" dark class="sticky-top">
    <NavbarBrand class="me-auto" href="/">
        <Helth />
    </NavbarBrand>
    <NavbarToggler on:click={toggle} class="me-2" />
    <Collapse {isOpen} navbar class="">
        <Nav navbar class="text-end">
            <NavItem class="">
                <NavLink href="/">Today</NavLink>
            </NavItem>
            <NavItem class="">
                <NavLink href="/">History</NavLink>
            </NavItem>
            <NavItem class="">
                <NavLink href="/">Profile</NavLink>
            </NavItem>
        </Nav>
    </Collapse>
</Navbar>
