<script>
  import { fade } from 'svelte/transition';
  // modal
  export let open = false;
  const toggle = () => {
      open = !open;
      if(open) {
        // keep the body from moving
        // check global.css for more rules
        document.body.classList.add('modal-open')
      } else {
        document.body.classList.remove('modal-open')
      }
    };
</script>

<div class="modal {open ? 'open' : ''}">
  <slot />
</div>

{#key open}
<button on:click={toggle} transition:fade="{{ duration: 250 }}" class="toggler"
    >{open ? '❌' : '➕'}</button>
{/key}

<style>
  .modal.open {
      display: block;
  }
  .modal {
      display: none;
      position: fixed;
      width: 98%;
      height: 98%;
      z-index: 120;
      top: 1%;
      bottom: 1%;
      right: 1%;
      left: 1%;
      background: #34474c;
      overflow-y: scroll;
  }
  .toggler {
    position: fixed;
    right: 25px;
    bottom: 30px;
    z-index: 130;
    background: #1ab8b8;
    border-radius: 10px;
    font-size: 2em;
    padding: 10px;
    border: none;
    box-shadow: 10px 0 15px black;
    touch-action: manipulation;
  }

</style>
