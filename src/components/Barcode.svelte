<script>
  import {BrowserMultiFormatReader} from '@zxing/library';

  let selected;
  let code = 'none yet';

  const codeReader = new BrowserMultiFormatReader();

  async function scan() {
    console.log('Selected device ID: ' + selected.deviceId);

    //codeReader.decodeFromVideoDevice(selected.deviceId, 'scanner', ((result) => {
    //  if(result) {
    //    code = result.getText();
    //  }
    //}));
    codeReader.decodeOnceFromVideoDevice(selected.deviceId, 'scanner').then((result) => {
      if(result) {
        code = result.getText();
      codeReader.reset();
      }
    });
  }

  async function cancel() {
      codeReader.reset();
  }

</script>

<div class="scanner">
  {#await codeReader.listVideoInputDevices()}
    <p>..waiting</p>
  {:then inputs}
    <select id="inputs" name="inputs" bind:value={selected} on:change="{() => scan()}">
      {#each inputs as input}
        <option value={input}>{input.label}</option>
      {/each}
    </select>

  <button class='scan_button' on:click={scan}>Scan</button>
  <button class='cancel_button' on:click={cancel}>Stop</button>
  <p class='value'>{code}</p>
  {:catch error}
    <p class=".error">oops!</p>
  {/await}
  <video id="scanner" name="scanner"></video>
</div>
<style>
  .scanner {
    width: 75%;
    margin: 0 auto;
    background: #d4cece;
    padding: 15px 20px;
    display: block;
    text-align: center;
  }
  select {
    border: solid 1px grey;
  }
  button {
    padding: 5px 10px;
  }
  .value {
    color: #16bdbd;
    font-size: 2rem;
  }
  video {
    display: block;
    min-width: 75%;
    margin: 0 auto;
  }
  .error {
    color: red;
    font-weight: bold;
  }
</style>
