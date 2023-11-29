<script>
  import { BrowserMultiFormatReader } from '@zxing/library';
  import { getInventory, addInventory } from '$stores/db';
  import { today } from '$stores/stores.js';
  import { successToast, errorToast, confirmDialog } from '$utils/toast.js';
  import { error } from '@sveltejs/kit';
  import { getFoodFacts } from '$utils/sources.js';

  // scanner
  let selected;

  const codeReader = new BrowserMultiFormatReader();

  async function scan() {
    codeReader
      .decodeOnceFromVideoDevice(selected.deviceId, 'scanner')
      .then(result => getFoodFacts(result.getText()))
      .then(val => {

        if(!val.nutrients && val.message) {
          errorToast('Item not found');
          throw error(404, `${val.message}`);
        }

        getInventory()
          .then(data => {
            if(!data
              .map(item => item.barcode)
              .includes(val.barcode)) {

              addInventory(val)
              .then(() => successToast('Item added to inventory!'))
              .catch(() => errorToast('Error saving item to inventory!'));
            }
            else {
              confirmDialog('An item with that barcode already exists in your inventory. Add to your daily total?', () => addToToday(val.nutrients), () => false );
            }
          });
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => codeReader.reset());
  }

  const addToToday = (data) => {
    $today.calories = $today.calories + Number( data.calories.quantity );
    $today.sodium = $today.sodium + Number( data.sodium.quantity );
    $today.protein = $today.protein + Number( data.protein.quantity );
    successToast('Added item to daily total!');
  }

  function cancel() {
    codeReader.reset();
      // // auto-close scanner
      // document.body.classList.remove('modal-open')
  }
</script>

<div class="scanner">
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
      <p class=".error">An error occurred when attempting to connect to your video input devices. Please contact the developer with the following error information: {error}</p>
    {/await}
    <video id="scanner" name="scanner"><track kind="captions" /></video>
    <div></div>
</div>

<style>
  .scanner {
    display: grid;
    grid-template-rows: [video] 2fr [controls] .5fr [end] .5fr;
    column-gap: 5px;
    row-gap: 20px;
    padding: 0;
    min-height: 100%;
  }
  video {
    grid-row-start: 1;
    grid-row-end: 2;
    width: 100%;
    max-height: 60vh;
    object-fit: cover;
  }
  .controls {
    display: grid;
    grid-row-start: 2;
    grid-row-end: 3;
    grid-template-rows: .75fr 1fr 1fr;
    grid-template-columns: 1fr 6fr 1fr;
    text-align: center;
    text-transform: uppercase;
    gap: 10px 0;
    /* padding-bottom: 40px; */
    /* margin-top: -25px; */
  }
  .controls label {
    font-size: 1.3em;
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
    /* grid-row-start: 3; */
    /* grid-row-end: 4; */
  }
  .buttons {
    grid-column-start: 2;
    grid-column-end: 3;
    display: grid;
    grid-template-rows: 1fr;
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
  @media screen and (max-width: 500px) {

  }
</style>
