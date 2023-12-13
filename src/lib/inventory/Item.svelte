<script>
  import {successToast, errorToast, confirmDialog} from '$utils/toast.js';
  import { today, inventory, recipes } from '$stores/stores.js';

  export let item;

  console.log(item.nutrients);
  const addToToday = () => {
    try {
        item.nutrients.map((index) => { 
        $today[index.key] = $today[index.key] || 0;
        $today[index.key] = $today[index.key] + index.quantity; 
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
    {#each item.nutrients as nutrient}
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
    margin-bottom: .2em 0;
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
    margin: 0 .5em;
  }
  button {
    margin: 0 .5rem;
  }
  @media screen and (max-width: 900px) {
    h4 {
      margin: .2em 0;
    }
    ul {
      text-align: left;
      padding-left: 0;
    }
  }
</style>
