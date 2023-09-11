<script>
  import {success, error, info} from '$utils/toast.js';
  import { nutrientsFromItem } from '$utils/item.js';
  import { today } from '$stores/stores.js';
  export let item;

  const addToToday = () => {
    const nutrients = nutrientsFromItem(item);
    try {
      Object.keys(nutrients).map((index) => { 
        $today[index] = $today[index] || 0;
        $today[index] = $today[index] + Number(nutrients[index]); 
      });
      success('Added to daily total!')
    } catch (err) {
      error('Error adding to total!')
    }
  }

  const editItem = () => {
    console.log('edit');
  }
</script>

<h4>{item.name}</h4>
<div>
  <div class='description'>{item.description}</div>
  {#if item.nutrients}
    <ul>
    {#each Object.values(item.nutrients) as nutrient}
      <li>{nutrient.name}: {nutrient.quantity}{nutrient.unit}</li>
    {/each}
    </ul>
  {/if}
</div>
<button on:click={addToToday} title='Add to Daily Total'>➕</button><!--add to daily total -->
<button on:click={editItem} title='Edit Item'>✏️</button> <!-- edit  -->
<button title='Add to Recipe'>📑</button> <!-- add to recipe -->
<button title='Delete Item from Inventory'>🗑️</button> <!-- remove from db -->

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
