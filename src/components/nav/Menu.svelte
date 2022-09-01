<script>
    export let isOpen = false;
    const toggle = () => (isOpen = !isOpen);
</script>

<span class="menu {isOpen ? 'moved' : ''}" on:click={toggle}>
    menu
    <i class="hamburger {isOpen ? 'open' : ''}" />
</span>
<nav class={isOpen ? 'shown' : ''}>
    <ul>
        <li><a href="/" on:click={toggle}>track 🗒  </a></li>
        <li><a href="/charts" on:click={toggle}>charts 📈 </a></li>
        <li><a href="/goals" on:click={toggle}>goals 🥇 </a></li>
    </ul>
</nav>

<style>
    nav {
        position: fixed;
        z-index: 100;
        right: -250px;
        min-width: 250px;
        height: 100%;
        background-color: var(--back-color);
        transition: all 0.3s ease-in-out;
        top: 0;
    }
    nav.shown {
        right: 0;
        box-shadow: 0 0 10px black;
    }
    ul {
        list-style: none;
        text-align: center;
        margin: 0;
        padding: 0;
    }
    li {
        margin: 0;
        padding: 0;
    }
    li a {
        display: block;
        padding: 20px 0;
        margin: 0;
        text-decoration: none;
        color: var(--a-link-color);
        transition: all 0.4s ease-in-out;
    }
    li a:hover {
      background-color: #03221b;
    }
    .menu {
      position: fixed;
      top: 20px;
      right: 0px;
      content: ' ';
      padding: 15px 60px 15px 20px;
      text-align: left;
      text-shadow: 0 0 5px black;
      color: var(--fore-color);
      text-decoration: none;
      transition: all 0.3s ease-in-out;
      background-color: var(--back-color);
      box-shadow: -10px 0px 10px 0px black;
      z-index: 110;
      touch-action: manipulation;
    }
    .menu.moved {
        right: 250px;
    }
    .hamburger {
        top: 50%;
    }
    .hamburger,
    .hamburger::before,
    .hamburger::after {
        display: block;
        content: ' ';
        width: 25px;
        height: 3px;
        transition: all 0.3s ease-in-out;
        background-color: var(--fore-color);
        position: absolute;
        right: 20px;
    }

    .hamburger::before {
        top: -8px;
        right: 0;
    }
    .hamburger::after {
        bottom: -8px;
        right: 0;
    }
    .hamburger.open {
        background-color: transparent;
    }
    .open.hamburger::after {
        transform: rotate(45deg);
        bottom: 0;
    }
    .open.hamburger::before {
        transform: rotate(-45deg);
        top: 0;
    }
</style>
