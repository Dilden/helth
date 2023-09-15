<script>
  import { BrowserMultiFormatReader } from '@zxing/library';
  import { today } from '$stores/stores';
  import { getInventory, addInventory } from '$stores/db';

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

          getInventory()
            .then(data => {
              if(!data
                .map(item => item.barcode)
                .includes(val.barcode)) {
                addInventory(val);
              }
            });

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

<div class="scanner">
  <div class='vid'>
    <video id="scanner" name="scanner"><track kind="captions" /></video>
  </div>
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
            <div class='buttons'>
              <button class="cancel_button" on:click={cancel}>❌ STOP</button>
              <button class="scan_button" on:click={scan}>📷 SCAN</button>
            </div>
        </div>
    {:catch error}
        <p class=".error">oops!</p>
    {/await}
</div>

<style>
    .scanner {
        display: grid;
        grid-template-rows: [video] 90% [controls] 10% [end] 25px;
        column-gap: 5px;
        row-gap: 15px;
        padding: 0;
        overflow-y: scroll;
    }
    .vid {
        grid-row-start: 1;
        grid-row-end: 2;
        width: 100%;
        text-align: center;
        margin: 0 auto;
    }
    video {
      width: 100%;
      max-height: 55vh;
    }
    .controls {
        display: grid;
        grid-row-start: 2;
        grid-row-end: 3;
        grid-template-rows: repeat(2, 1fr);
        grid-template-columns: 1fr 6fr 1fr;
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
        grid-column-start: 2;
        grid-column-end: 3;
    }
    .controls select {
        border: solid 1px grey;
        grid-row-start: 2;
        grid-row-end: 2;
        grid-column-start: 2;
        grid-column-end: 3;
    }
    .controls button {
        padding: 5px 10px;
        grid-row-start: 3;
        grid-row-end: 4;
    }
    .buttons {
      grid-column-start: 2;
      grid-column-end: 3;
      display: grid;
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr 1fr;
      column-gap: 10px;
    }
    button.cancel_button {
      grid-column-start: 1;
      grid-column-end: 2;
    }
    button.scan_button {
      grid-column-start: 2;
      grid-column-end: 3;
    }
</style>
