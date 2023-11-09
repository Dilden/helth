<script>
  import Item from './Item.svelte';
  import AddItem from '$lib/inventory/AddItem.svelte';
  import Spinner from '$lib/Spinner.svelte';
  import Search from '$lib/inventory/Search.svelte';
  import { inventory, filteredInventory } from '$stores/stores.js';

  let editing = undefined;
  let formVisible = false;

  const editItem = (item) => {
    formVisible = false;
    editing = item;
  }
</script>
<button on:click|preventDefault={() => {formVisible = !formVisible; editing = undefined;}}>{(!formVisible ? 'Add Item' : 'Cancel')}</button>

{#if formVisible}
  <AddItem submitCallback={() => { formVisible = false; editing = undefined; }}/>
{/if}
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
        {#each $filteredInventory.slice().reverse() as item}
          <li>
            {#if editing?.id === item.id}
              <AddItem {item} submitCallback={() => (editing = undefined)}/>
            {:else}
              <Item {item} />
              <button on:click|preventDefault={editItem(item)} title="Edit Item">✏️</button> <!-- edit  -->
            {/if}
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
  button {
    margin: 1rem;
  }
  li button {
    margin: .5rem;
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
  .search_bar {
    margin: var(--universal-margin);
    margin-top: 0;
    position: relative;
  }
  @media screen and (max-width: 925px) {
    .inventory {
      grid-template-rows: 1fr 1fr auto;
      grid-template-columns: 1fr;
    }
    .search_bar, h3, ul {
      grid-column-start: 1;
      grid-column-end: 2;
    }
  }
</style>
