<script>
  // import { searchTerm } from '$stores/stores.js';
  export let searchStoreVal = {};
  export let searchTitle = 'Search';

  const scrollIt = () => {
    const top = document.getElementById("searching");
    top.scrollIntoView(true, {behavior: 'smooth'});
  }
</script>

<label id="searching" for="search">{searchTitle}</label>
<span>
  <input id="search" bind:value={searchStoreVal} type="text" placeholder='Begin typing...'on:focus={scrollIt}/>
  <button aria-label="Clear search" on:click|preventDefault={() => searchStoreVal = ''}>❌</button>
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
