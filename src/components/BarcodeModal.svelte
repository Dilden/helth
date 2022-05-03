<script>
	import Barcode from './Barcode.svelte'

	function toggle() {
	}
</script>

<button on:click={toggle}>📷</button>

  <div
    on:click={toggle}
  />

<style>
button {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  background: #ed5a42;
  border-radius: 28px;
  font-size: 2em;
  padding: 5px 10px;
  border: none;
  box-shadow: 10px 0 15px black;
}
</style>
