<script>
  import { BrowserMultiFormatReader } from '@zxing/library';
  import Modal from '$components/Modal.svelte';
  import { todayStore } from '../stores/local';

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
          $todayStore.calories = $todayStore.calories + val.calories.quantity;
          $todayStore.salt = $todayStore.salt + val.sodium.quantity;
          $todayStore.protein = $todayStore.protein + val.protein.quantity;
          open = false;
        })
        .catch(error => console.log(error))
        .finally(() => codeReader.reset());
  }

  function cancel() {
      codeReader.reset();
      open = false;
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
                <select
                    id="inputs"
                    name="inputs"
                    bind:value={selected}
                    on:change={() => scan()}
                >
                    {#each inputs as input}
                        <option value={input}>{input.label}</option>
                    {/each}
                </select>
                <button class="scan_button" on:click={scan}>📷 SCAN</button>
                <button class="cancel_button" on:click={cancel}>❌ STOP</button>
            </div>
        {:catch error}
            <p class=".error">oops!</p>
        {/await}
    </div>
</Modal>

<style>
    .scanner {
        background: #34474c;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        column-gap: 5px;
        row-gap: 5px;
        width: 100%;
        height: 100%;
    }
    .controls {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 2;
        grid-row-end: 3;
        text-align: center;
        display: grid;
        text-transform: uppercase;
        row-gap: 5px;
    }
    .controls label {
        font-size: 1.4em;
    }
    .controls select {
        border: solid 1px grey;
    }
    .controls button {
        padding: 5px 10px;
    }
    video {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 2;
        display: block;
        margin: 0 auto;
        width: 100%;
        height: auto;
    }
</style>
