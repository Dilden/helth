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
                <button class="scan_button" on:click={scan}>📷 Scan</button>
                <button class="cancel_button" on:click={cancel}>❌ Stop</button>
            </div>
        {:catch error}
            <p class=".error">oops!</p>
        {/await}
        <video id="scanner" name="scanner"><track kind="captions" /></video>
    </div>
</Modal>

<style>
    .scanner {
        background: #34474c;
        padding: 15px 20px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 75px 1fr 50px;
        position: absolute;
        top: 20px;
        right: 20px;
        left: 20px;
        bottom: 20px;
        box-shadow: 10px 0 15px black;
        max-width: 100%;
    }
    .controls {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 1;
        text-align: center;
    }
    .controls label {
        font-size: 0.9em;
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
        grid-row-start: 2;
        grid-row-end: 3;
        display: block;
        margin: 0 auto;
        min-width: 100%;
        height: auto;
        max-height: 100%;
        max-width: 100%;
    }
</style>
