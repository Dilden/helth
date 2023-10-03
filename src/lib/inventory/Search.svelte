<script>
  import { searchTerm } from '$stores/stores.js';
</script>

<label for="search">Search</label>
<input id="search" bind:value={$searchTerm} type="text" placeholder='Begin typing...'/>

<style>
  * {
    display: block;
    margin: 0;
    width: 100%;
  }
</style>
