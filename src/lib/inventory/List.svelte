<script>
  import Item from './Item.svelte';
  import AddItem from '$lib/inventory/AddItem.svelte';
  import Spinner from '$lib/Spinner.svelte';
  import Search from '$lib/inventory/Search.svelte';
  import { inventory, filteredInventory } from '$stores/stores.js';

  let formVisible = false;

</script>
<button on:click|preventDefault={() => (formVisible = !formVisible)}>Add Item</button>

<div class={formVisible ? 'showForm' : 'hideForm'} >
  <AddItem submitCallback={() => (formVisible = false)}/>
</div>
<div class='inventory'>
  <h3>Saved Items</h3>

  <div class='search_bar'>
    <Search />
  </div>
  <ul aria-label='inventory-list'>
    {#await inventory.init()}
      <Spinner />
      {:then}
      {#if $inventory.length}
        {#each $filteredInventory.reverse() as item}
          <li>
            <Item {item} bind:addForm={formVisible} />
          </li>
        {/each}
      {/if}
      {:catch error}
      <p>Error displaying inventory: {error}</p>
    {/await}
  </ul>
</div>

<style>
  .inventory {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr auto;
  }
  .showForm {
    display: block;
  }
  .hideForm {
    display: none;
  }
  button {
    margin: 1rem;
  }
  ul {
    list-style: none;
    margin-bottom: 2rem;
    grid-column-start: 1;
    grid-column-end: 3;
    padding: 0;
  }
  li {
    margin: .75rem;
    padding: 1rem;
  }
  ul li:nth-child(odd) {
    background: #1F2A2D;
  }
</style>
