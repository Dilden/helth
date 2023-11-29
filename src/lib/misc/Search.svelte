<script>
  export let searchStoreVal = {};
  export let searchTitle = 'Search';
  export let scrollTo = true;

  const scrollIt = () => {
    const top = document.getElementById("searching-" + searchTitle);
    top.scrollIntoView(true, {behavior: 'smooth'});
  }
</script>

<label id="searching-{searchTitle}" for="search-{searchTitle}">{searchTitle}</label>
<span>
  <input id="search-{searchTitle}" bind:value={searchStoreVal} type="text" placeholder='Begin typing...' on:focus={(scrollTo ? scrollIt : false )}/>
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
