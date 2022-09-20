<script>
  import { fade } from 'svelte/transition';
  // modal
  export let open = false;
  const toggle = () => (open = !open);
</script>

<div class="modal {open ? 'open' : ''}">
  <slot />
</div>

{#key open}
<button on:click={toggle} transition:fade class="toggler"
    >{open ? '❌' : '➕'}</button>
{/key}

<style>
  .modal.open {
      display: block;
  }
  .modal {
      display: none;
      position: fixed;
      max-width: 100%;
      height: 95%;
      z-index: 95;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
  }
  .toggler {
    position: fixed;
    right: 25px;
    bottom: 30px;
    z-index: 100;
    background: #1ab8b8;
    border-radius: 10px;
    font-size: 2em;
    padding: 10px;
    border: none;
    box-shadow: 10px 0 15px black;
    touch-action: manipulation;
  }

</style>
