<script>
  import { searchTerm } from '$stores/stores.js';
</script>

<label for="search">Search</label>
<span>
  <input id="search" bind:value={$searchTerm} type="text" placeholder='Begin typing...'/>
  <button aria-label="Clear search" on:click|preventDefault={() => $searchTerm = ''}>❌</button>
</span>

<style>
  span {
    display: flex;
    justify-content: flex-start;
    border: solid 1px gray;
  }
  span:focus-within {
    outline: solid 1px cyan;
  }
  label, input {
    display: block;
    margin: 0;
    width: 100%;
  }
  input, button {
    border: none;
  }
  input:focus-visible {
    outline: none;
  }
  
</style>
