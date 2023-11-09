<script>
  import { recipeSearch } from '$stores/stores.js';
</script>

<label for="search">Search Recipes</label>
<input id="search" bind:value={$recipeSearch} type="text" placeholder='Begin typing...'/>

<style>
  * {
    display: block;
    margin: 0;
    width: 100%;
  }
</style>
