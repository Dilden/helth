<script>
    export let count;
    export let title;

    function decrement() {}
</script>

<div class="container">
    <h2>{title}</h2>
    <div class="controls">
        <button on:click={() => count--}> - </button>
        <input bind:value={count} type="text" min="0" />
        <button on:click={() => count++}> + </button>
    </div>
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
      padding: 5px 10px;
      font-size: 2em;
    }
    button {
      flex: 1 1 auto;
      width: 24%;
    }
    input[type='text'] {
      flex: 2 1 auto;
      width: 49%;
    }
</style>
