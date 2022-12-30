<script>
  import { BrowserMultiFormatReader } from '@zxing/library';
  import Modal from '$components/Modal.svelte';
  import { today, inventory } from '$stores/stores';

  // scanner
  let selected;
  let open = false;

  const codeReader = new BrowserMultiFormatReader();

  async function scan() {
      //console.log('Selected device ID: ' + selected.deviceId);
      codeReader
        .decodeOnceFromVideoDevice(selected.deviceId, 'scanner')
        .then(result => fetch(`/upc?barcode=${result.getText()}`))
        .then(response => response.json())
        .then(val => {
          // if inventory does not have barcode, add it
          $inventory = val;
          $today.calories = $today.calories + val.nutrients.calories.quantity;
          $today.sodium = $today.sodium + val.nutrients.sodium.quantity;
          $today.protein = $today.protein + val.nutrients.protein.quantity;
          open = false;
          document.body.classList.remove('modal-open')
        })
        .catch(error => console.log(error))
        .finally(() => codeReader.reset());
  }

  function cancel() {
      codeReader.reset();
      open = false;
      document.body.classList.remove('modal-open')
  }
</script>

<Modal bind:open={open}>
    <div class="scanner">
        <video id="scanner" name="scanner"><track kind="captions" /></video>
        {#await codeReader.listVideoInputDevices()}
            <p>..waiting</p>
        {:then inputs}
            <div class="controls">
                <label for="inputs">Select device</label>
                <select id="inputs" name="inputs" bind:value={selected} on:change={() => scan()} >
                    {#each inputs as input}
                        <option value={input}>{input.label}</option>
                    {/each}
                </select>
                <button class="cancel_button" on:click={cancel}>❌ STOP</button>
                <button class="scan_button" on:click={scan}>📷 SCAN</button>
            </div>
        {:catch error}
            <p class=".error">oops!</p>
        {/await}
    </div>
</Modal>

<style>
    .scanner {
        display: grid;
        grid-template-rows: [video] 2fr [controls] 1fr [end] 25px;
        column-gap: 5px;
        row-gap: 15px;
        width: 100%;
        height: 100%;
        background: #34474c;
        padding: 0;
        overflow-y: scroll;
    }
    video {
        grid-row-start: 1;
        grid-row-end: 2;
        display: block;
        margin: 0 auto;
        width: 100%;
        max-width: 1100px;
        height: auto;
    }
    .controls {
        display: grid;
        grid-row-start: 2;
        grid-row-end: 3;
        grid-template-rows: repeat(2, 1fr);
        text-align: center;
        text-transform: uppercase;
        row-gap: 15px;
        column-gap: 15px;
        padding: 0 10px;
    }
    .controls label {
        font-size: 1.4em;
        grid-row-start: 1;
        grid-row-end: 1;
        grid-column-start: 1;
        grid-column-end: 3;
    }
    .controls select {
        border: solid 1px grey;
        grid-row-start: 2;
        grid-row-end: 2;
        grid-column-start: 1;
        grid-column-end: 3;
    }
    .controls button {
        padding: 5px 10px;
        grid-row-start: 3;
        grid-row-end: 4;
    }
    .controls button.scan_button {
        grid-column-start: 2;
        grid-column-end: 3;
    }
    .controls button.cancel_button {
        grid-column-start: 1;
        grid-column-end: 2;
    }
</style>
