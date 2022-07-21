<script>
  export let count;
  export let title;
  export let incr = 1;

  function increment() {
    return count = count + incr;
  }
  function decrement() {
    return count = count - incr;
  }
</script>

<div class="container">
    <h2>{title}</h2>
    <div class="controls">
        <button on:click={decrement}> -{incr} </button>
        <input value={count} type="text" min="0" />
        <button on:click={increment}> +{incr} </button>
    </div>
    <input type="range" min=1 max=100 bind:value={incr}/>
</div>

<style>
    h2 {
      text-align: center;
    }
    .controls {
      display: flex;
      gap: 0;
    }
    button,
    input {
      padding: 5px 15px;
      font-size: 1.5em;
      vertical-align: center;
    }
    button {
      flex: 1 1 auto;
    }
    input[type='text'] {
      flex: 2 1 auto;
      width: 49%;
    }
</style>
