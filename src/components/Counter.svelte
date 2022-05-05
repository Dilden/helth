<script>
    export let count;
    export let title;

    function decrement() {

    }
</script>
<div class="container">
    <h2>{title}</h2>
    <div class="controls">
        <button on:click={() => count--}> - </button>
        <input bind:value={count} type="text" min='0'>
        <button on:click={() => count++}> + </button>
    </div>
</div>

<style>
    .container {
        text-align: center;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: 1fr 1fr;
    }
    h2 {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 2;

    }
    .controls {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 2;
        grid-row-end: 3;
    }
    button, input {
        margin: 0;
        padding: 5px 10px;
        vertical-align: center;
        font-size: 2em;
    }
    input[type=text] {
        width: 5em;
    }
</style>
