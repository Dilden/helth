<script>
  import {BrowserQRCodeReader, BrowserMultiFormatReader} from '@zxing/browser';

  let selected;
  let code = 'none yet';

  const codeReader = new BrowserMultiFormatReader();

  async function scan() {
    console.log('Selected device ID: ' + selected.deviceId);

    codeReader.decodeOnceFromVideoDevice(selected.deviceId, 'scanner').then((result) => {
      if(result) {
        code = result.getText();
      }
    });
  }

  function cancel() {

  }

</script>

<div class="scanner">
  {#await BrowserMultiFormatReader.listVideoInputDevices()}
    <p>..waiting</p>
  {:then inputs}
    <select id="inputs" name="inputs" bind:value={selected} on:change="{() => scan()}">
      {#each inputs as input}
        <option value={input}>{input.label}</option>
      {/each}
    </select>

  <button on:click={scan}>Scan</button>
  <button on:click={cancel}>Stop</button>
  <p>Code value: {code}</p>
  {:catch error}
    <p class=".error">oops!</p>
  {/await}
  <video id="scanner"></video>
</div>
<style>
  .scanner {
    display: flex;
    flex-flow: column wrap;
    background: grey;
    padding: 15px 20px;
    justify-content: center;
    align-items: center;
  }
  #inputs {
    border: black;
    text-transform: uppercase;
  }
  video {

  }
  .error {
    color: red;
    font-weight: bold;
  }
</style>
