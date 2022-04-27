<script>
  import {BrowserBarcodeReader} from '@zxing/browser';

  const scanner = new BrowserBarcodeReader();
  console.log('scanner init');
  scanner.getVideoInputDevices().then((videoInputDevices) => {
    const sourceSelect = document.getElementById('sourceSelect')
  });
</script>
<div class="scanner">
  <div>
      <a class="button" id="startButton">Start</a>
      <a class="button" id="resetButton">Reset</a>
  </div>

  <div>
    <video id="video" width="600" height="400" style="border: 1px solid gray"></video>
  </div>

  <div id="sourceSelectPanel">
      <label for="sourceSelect">Change video source:</label>
      <select id="sourceSelect" style="max-width:400px">
      </select>
  </div>
</div>
<style>
  #sourceSelectPanel {
    display: none;
  }
  .scanner {
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
