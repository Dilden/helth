<script>
  export let searchStoreVal = {};
  export let searchTitle = 'Search';
  export let scrollTo = true;

  const scrollIt = () => {
    const top = document.getElementById("searching-" + searchTitle);
    top.scrollIntoView(true, {behavior: 'smooth'});
  }
</script>

<label class="block m-0 w-full" id="searching-{searchTitle}" for="search-{searchTitle}">{searchTitle}</label>
<span class="flex justify-start focus-within:outline">
  <input class="block m-0 w-full border-none focus-within:outline-none" id="search-{searchTitle}" bind:value={searchStoreVal} type="text" placeholder='Begin typing...' on:focus={(scrollTo ? scrollIt : false )}/>
  <button class="border-none" aria-label="Clear search" on:click|preventDefault={() => searchStoreVal = ''}>❌</button>
</span>
