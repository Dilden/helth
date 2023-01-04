<script>
  export let count;
  export let title;
  export let interval = 1;
  export let max = 100;
  export let diffString = '';

  let sliderShow = false;

  function increment() {
    return count = count + interval;
  }
  function decrement() {
    count = count - interval;
    if(count <= 0) {
      count = 0;
    }
    return count;
  }
</script>

<div class="container">
  <h3 on:click="{() => sliderShow = !sliderShow}">{title}</h3>
  <h5>{@html diffString}</h5> 
  <div class="controls">
      <button on:click={decrement}> -{interval} </button>
      <input bind:value={count} type="number" min="0" />
      <button on:click={increment}> +{interval} </button>
  </div>
  <input disabled={!sliderShow} class:show={sliderShow} type="range" min=1 max={max} bind:value={interval}/>
</div>

<style>
    .container {
      text-align: center;
    }
    .controls {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      align-content: center;
      align-items: center;
      gap: 0;
    }
    input, button {
      font-size: 1.5em;
      border: none;
      margin: auto;
      padding: 10px;
      color: #000000;
      touch-action: manipulation;
    }
    input[type='number'] {
      -webkit-box-flex: 2 1 auto;
      -moz-box-flex: 2 1 auto;
      -webkit-flex: 2 1 auto;
      -ms-flex: 2 1 auto;
      -moz-appearance: textfield;
      flex: 2 1 auto;
      width: 50%;
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      border-radius: 0;
      min-width: 75px;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type='range'] {
      width: 90%;
      font-size: 3em;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      padding: 10px 0;
      margin: 10px;
    }
    .show {
      opacity: 1 !important;
    }
    button {
      -webkit-appearance: none;
      -webkit-box-flex: 1 1 auto;
      -moz-box-flex: 1 1 auto;
      -webkit-flex: 1 1 auto;
      -ms-flex: 1 1 auto;
      flex: 1 1 auto;
      background-color: #e9e9ed;
      transition: all 0.2s ease-in-out;
    }
    button:first-child {
      -webkit-border-radius: 10px 0 0 10px;
      -moz-border-radius: 10px 0 0 10px;
      border-radius: 10px 0 0 10px;
    }
    button:last-child {
      -webkit-border-radius: 0 10px 10px 0;
      -moz-border-radius: 0 10px 10px 0;
      border-radius: 0 10px 10px 0;
    }
    button:hover {
      background-color: #d0d0d7;
    }
</style>