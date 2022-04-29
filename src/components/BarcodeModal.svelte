<script>
    import { Modals, closeModal, openModal, modals } from 'svelte-modals'
	import { fade } from 'svelte/transition'
	import Barcode from './Barcode.svelte'

	function toggle() {
		openModal(Barcode);
	}
</script>

<button on:click={toggle}>📷</button>

<Modals>
  <div
    slot="backdrop"
    class="backdrop"
		transition:fade
    on:click={closeModal}
  />
</Modals>

<style>
button {
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  background: #ed5a42;
  border-radius: 28px;
  font-size: 2em;
  padding: 5px 10px;
}
</style>
