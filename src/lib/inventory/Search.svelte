<script>
  import { searchTerm } from '$stores/stores.js';
</script>

<label for="search">Search</label>
<input id="search" bind:value={$searchTerm} type="text" placeholder='Begin typing...'/>

<style>
  * {
    display: block;
    margin: .24em;
    width: 90%;
  }
</style>
