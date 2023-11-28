<script>
  import { recipeSearch } from '$stores/stores.js';
</script>

<label for="search">Search Recipes</label>
<span>
  <input id="search" bind:value={$recipeSearch} type="text" placeholder='Begin typing...'/>
  <button aria-label="Clear search" on:click|preventDefault={() => $recipeSearch = ''}>❌</button>
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
