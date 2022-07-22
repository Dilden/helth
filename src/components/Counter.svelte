<script>
  export let count;
  export let title;
  export let incr = 1;
  export let max = 100;

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
    <input type="range" min=1 max={max} bind:value={incr}/>
</div>

<style>
    .container {
      text-align: center;
    }
    .controls {
      display: flex;
      gap: 0;
    }
    button {
      flex: 1 1 auto;
      font-size: 1.5rem;
    }
    input[type='text'] {
      flex: 2 1 auto;
      width: 49%;
      font-size: 1.5rem;
    }
</style>
