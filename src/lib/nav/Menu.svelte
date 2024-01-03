<script>
  import meme from './meme.png';
  export let isOpen = false;
  const toggle = () => (isOpen = !isOpen);
</script>

<button title="Menu" class="menu {isOpen ? 'moved' : ''}" on:click={toggle}>
    <i class="hamburger {isOpen ? 'open' : ''}" />
</button>
<nav class={isOpen ? 'shown' : ''}>
    <ul>
        <li><a href="/" on:click={toggle}>🗒 track</a></li>
        <li><a href="/charts" on:click={toggle}>📈 charts</a></li>
        <li><a href="/goals" on:click={toggle}>🥇 goals</a></li>
        <li><a href="/timers" on:click={toggle}>⏲  timers</a></li>
        <li><a href="/settings" on:click={toggle}>⚙️  settings </a></li>
        <li><a href="/about" on:click={toggle}>❓ about</a></li>
    </ul>
  <img src="{meme}" class="absolute right-0 bottom-0 mx-auto max-w-full" alt="A 3D rendering of a bald and weirdly long face placed on a person wearing a lab coat with a stehoscope over his shoulders and stadning with his arms crossed." width="auto" height="auto" />
</nav>

<style>
    nav {
        position: fixed;
        z-index: 110;
        right: -250px;
        min-width: 250px;
        height: 100%;
        background-color: var(--back-color);
        transition: all 0.3s ease-in-out;
        top: 0;
    }
    nav.shown {
        right: 0;
        box-shadow: 0px 65px 10px 0px black;
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
      background-color: var(--secondary-back-color);
    }
    .menu {
      position: fixed;
      top: 0;
      right: 0;
      content: ' ';
      padding: 30px;
      text-align: left;
      text-shadow: 0 0 5px black;
      color: var(--fore-color);
      text-decoration: none;
      transition: all 0.3s ease-in-out;
      background-color: var(--back-color);
      border-radius: 0 0 0 10px;
      box-shadow: 0px 0px 10px 0px black;
      touch-action: manipulation;
      z-index: 100;
      border: none;
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
        width: 30px;
        padding: 1px;
        transition: all 0.3s ease-in-out;
        background-color: var(--fore-color);
        position: absolute;
        right: 10px;
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
