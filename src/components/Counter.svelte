<script>
  export let count;
  export let title;
  export let incr = 1;
  export let max = 100;

  function increment() {
    return count = count + incr;
  }
  function decrement() {
    count = count - incr;
    if(count <= 0) {
      count = 0;
    }
    return count;
  }
</script>

<div class="container">
    <h2>{title}</h2>
    <div class="controls">
        <button on:click={decrement}> -{incr} </button>
        <input value={count} type="text" min="0" />
        <button on:click={increment}> +{incr} </button>
    </div>
    <input type="range" min=1 max={max} bind:value={incr}/>
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
    }
    input[type='text'] {
      -webkit-box-flex: 2 1 auto;
      -moz-box-flex: 2 1 auto;
      -webkit-flex: 2 1 auto;
      -ms-flex: 2 1 auto;
      flex: 2 1 auto;
      width: 50%;
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      border-radius: 0;
      min-width: 75px;
    }
    input[type='range'] {
      width: 90%;
      font-size: 3em;
    }
    button {
      -webkit-box-flex: 1 1 auto;
      -moz-box-flex: 1 1 auto;
      -webkit-flex: 1 1 auto;
      -ms-flex: 1 1 auto;
      flex: 1 1 auto;
      background-color: #e9e9ed;
      transition: all 0.2s ease-in-out;
    }
    button:first-child {
      -webkit-appearance: none;
      -webkit-border-radius: 10px 0 0 10px;
      -moz-border-radius: 10px 0 0 10px;
      border-radius: 10px 0 0 10px;
    }
    button:last-child {
      -webkit-appearance: none;
      -webkit-border-radius: 0 10px 10px 0;
      -moz-border-radius: 0 10px 10px 0;
      border-radius: 0 10px 10px 0;
    }
    button:hover {
      background-color: #d0d0d7;
    }
</style>
