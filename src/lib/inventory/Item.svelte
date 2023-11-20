<script>
  import {successToast, errorToast, confirmDialog} from '$utils/toast.js';
  import { nutrientsFromItem } from '$utils/item.js';
  import { today, inventory, recipes } from '$stores/stores.js';

  export let item;

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

  const confirmDelete = () => {
    confirmDialog('Are you sure you want to delete this item? This item will also be removed from any Recipes it has been included in.', deleteItem, () => false);
  }

  const deleteItem = async () => {
    await inventory.delete(item.id)
    .then(() => successToast('Removed item!'))
    .catch(() => errorToast('Error deleting item!'));
    await recipes.init();
  }
</script>

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
<button on:click={addToToday} title="Add to Daily Total">➕</button><!--add to daily total -->
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
  @media screen and (max-width: 900px) {
    ul {
      text-align: left;
      padding-left: 0;
    }
  }
</style>
