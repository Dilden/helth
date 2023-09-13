<script>
  import { toast } from '@zerodevx/svelte-toast';

  export let message = '';
  export let callbackConfirm = () => true;
  export let callbackDeny = () => false;

  const yes = () => {
    toast.pop(0); // removes all toasts
    callbackConfirm();
  }
  const no = () => {
    toast.pop(0); // removes all toasts
    callbackDeny();
  }
</script>
<div>
  <p>{message}</p>
  <button class="yes" title="Yes" on:click={yes}>Yes</button>
  <button class="no" title="No" on:click={no}>No</button>
</div>

<style>
  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr .5fr;
    column-gap: 10px;
  }
  .yes {
    grid-column-start: 1;
    grid-column-end: 1;
  }
  .no {
    grid-column-start: 2;
    grid-column-end: 2;
  }
  p {
    grid-column-start: 1;
    grid-column-end: 3;
  }
  .yes, .no {
    font-size: 1.25em;
  }
</style>
