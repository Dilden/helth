<script>
  import {successToast, errorToast, confirmDialog} from '$utils/toast.js';
  import { nutrientsFromItem } from '$utils/item.js';
  import { today, inventory } from '$stores/stores.js';
  import AddItem from '$lib/inventory/AddItem.svelte';

  export let item;
  export let addForm;

  const addToToday = () => {
    const nutrients = nutrientsFromItem(item);
    try {
      Object.keys(nutrients).map((index) => { 
        $today[index] = $today[index] || 0;
        $today[index] = $today[index] + Number(nutrients[index]); 
      });
      successToast('Added to daily total!')
    } catch (err) {
      errorToast('Error adding to total!')
    }
  }

  let edit = false;
  const editItem = () => {
    edit = !edit;
    addForm = false;
  }
  const confirmDelete = () => {
    confirmDialog('Are you sure you want to delete this item?', deleteItem, () => false);
  }

  const deleteItem = () => {
    inventory.delete(item.id)
    .then(() => successToast('Removed item!'))
    .catch(() => errorToast('Error deleting item!'));
  }
</script>

{#if edit}
  <AddItem {item} submitCallback={editItem}/>
{:else}
  <h4>{item.name}</h4>
  <div>
    <div class="description">{item.description}</div>
    {#if item.nutrients}
      <ul>
      {#each Object.values(item.nutrients) as nutrient}
        {#if nutrient.quantity > 0}
          <li>{nutrient.name}: {nutrient.quantity}{nutrient.unit}</li>
        {/if}
      {/each}
      </ul>
    {/if}
  </div>
{/if}
<button on:click={addToToday} title="Add to Daily Total">➕</button><!--add to daily total -->
<button on:click={editItem} title="Edit Item">✏️</button> <!-- edit  -->
<!-- <button title="Add to Recipe">📑</button> <!-- add to recipe -->
<button on:click={confirmDelete} title="Delete Item from Inventory">🗑️</button> <!-- remove from db -->

<style>
  h4 {
    margin-left: 0;
    margin-bottom: .4em;
  }
  .description {
    font-size: .9em;
  }
  ul {
    list-style: none;
    text-align: center;
  }
  ul li {
    font-size: .8em;
    font-style: italic;
    display: inline-block;
    margin: 0 1em;
  }
  button {
    margin: 0 .5rem;
  }
</style>
