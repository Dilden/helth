<script>
    export let count;
    export let title;

    function decrement() {

    }
</script>
<div class="container">
    <h2>{title}</h2>
    <div class="row button-group">
        <button on:click={() => count--}> - </button>
        <input bind:value={count} type="text" min='0'>
        <button on:click={() => count++}> + </button>
    </div>
</div>

<style>
    button, input {
        margin: 0;
        padding: 0 5px;
        vertical-align: center;
        font-size: 2em;
    }
    input[type=text] {
        width: 5em;
    }
    .container {
        text-align: center;
    }
</style>
