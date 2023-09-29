<script>
  export let count;
  export let title;
  export let interval = 1;
  export let max = 100;
  export let diffString = '';

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
  <label for="countValue_{title}" class="countTitle">{title}</label>
  <div class="diffString">{@html diffString}</div> 
  <div class="controls">
    <button on:click={decrement}> -{interval} </button>

    <input id="countValue_{title}" bind:value={count} type="number" min="0" />

    <button on:click={increment}> +{interval} </button>
  </div>
  <input aria-label="Adjust interval for {title}" id="interval_{title}" type="range" min=1 max={max} bind:value={interval}/>
</div>

<style>
  .diffString {
    font-weight: 500;
    margin: .5rem;
  }
  .countTitle {
    font-size: calc(1rem * var(--heading-ratio) * var(--heading-ratio));
    font-weight: 500;
  }
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
    appearance: textfield;
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
    padding: 0;
    margin: 10px auto;
  }
  button {
    appearance: none;
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
