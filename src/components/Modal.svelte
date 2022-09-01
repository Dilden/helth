<script>
    // modal
    export let open = false;
    const toggle = () => (open = !open);
</script>

<div class="modal {open ? 'open' : ''}">
  <slot />
</div>

<button on:click={toggle} color="primary" class="toggler"
    >{open ? '❌' : '📷'}</button
>

<style>
  .modal.open {
      display: block;
  }
  .modal {
      display: none;
      position: absolute;
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
    right: 20px;
    bottom: 20px;
    z-index: 100;
    background: #1ab8b8;
    border-radius: 28px;
    font-size: 2em;
    padding: 5px 10px;
    border: none;
    box-shadow: 10px 0 15px black;
    touch-action: manipulation;
  }
</style>
