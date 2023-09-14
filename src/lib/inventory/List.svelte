<script>
  import Item from './Item.svelte';
  import AddItem from '$lib/inventory/AddItem.svelte';
  import Spinner from '$lib/Spinner.svelte';
  import { inventory } from '$stores/stores.js';

  let formVisible = false;

</script>

<button on:click|preventDefault={() => (formVisible = !formVisible)}>Add Item</button>

<div class={formVisible ? 'showForm' : 'hideForm'} >
  <AddItem submitCallback={() => (formVisible = false)}/>
</div>
<h3>Saved Items</h3>
<ul aria-label='inventory-list'>
{#await inventory.init()}
  <Spinner />
{:then}
  {#if $inventory.length}
    {#each $inventory.reverse() as item}
      <li>
        <Item {item} bind:addForm={formVisible} />
      </li>
    {/each}
  {/if}
{:catch error}
  <p>Error displaying inventory: {error}</p>
{/await}
</ul>

<style>
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
  }
  li {
    margin: .75rem;
    padding: 1rem;
  }
  ul li:nth-child(odd) {
    background: #1F2A2D;
  }
</style>
