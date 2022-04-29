<script>
  import {BrowserMultiFormatReader} from '@zxing/library';
  import { closeModal, modals } from 'svelte-modals'
  import { fly } from 'svelte/transition'

  export let isOpen;

  let selected;
  let code = '';

  const codeReader = new BrowserMultiFormatReader();

  async function scan() {
    console.log('Selected device ID: ' + selected.deviceId);

    codeReader.decodeOnceFromVideoDevice(selected.deviceId, 'scanner').then((result) => {
      if(result) {
        code = result.getText();
        codeReader.reset();
      }
    });
  }

  function cancel() {
      codeReader.reset();
      closeModal();
  }

</script>

{#if isOpen}
  <div role="dialog" class="modal" transition:fly={{ y: 50 }} on:introstart on:outroend>
    <div class="scanner">
      {#await codeReader.listVideoInputDevices()}
        <p>..waiting</p>
      {:then inputs}
      <div class="controls">
          <label for="inputs">Select device</label>
          <select id="inputs" name="inputs" bind:value={selected} on:change="{() => scan()}">
            {#each inputs as input}
              <option value={input}>{input.label}</option>
            {/each}
          </select>

        <button class='scan_button' on:click={scan}>📷 Scan</button>
        <button class='cancel_button' on:click={cancel}>❌ Stop</button>
      </div>
      <p class='value'>{code}</p>
      {:catch error}
        <p class=".error">oops!</p>
      {/await}
      <video id="scanner" name="scanner"><track kind="captions"/></video>
    </div>
  </div>
{/if}

<style>
  .scanner {
    background: #d4cece;
    padding: 15px 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 75px 1fr 50px;
    box-shadow: 0px 0px 4px 15px #969191;
    position: absolute;
    top: 20px;
    right: 20px;
    left: 20px;
    bottom: 60px;
  }
  .controls {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 1;
    text-align: center;
  }
  .controls label {
    font-size: .9em;
  }
  .controls select {
    border: solid 1px grey;
  }
  .controls button {
    padding: 5px 10px;
  }
  .value {
    color: #16bdbd;
    font-size: 2rem;
    text-align: center;
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 3;
    grid-row-end: 4;
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
  }
</style>
