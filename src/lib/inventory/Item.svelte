<script>
  import {success, error, info} from '$utils/toast.js';
  import { nutrientsFromItem } from '$utils/item.js';
  import { today } from '$stores/stores.js';
  import { toast } from '@zerodevx/svelte-toast';
  import AddItem from '$lib/inventory/AddItem.svelte';
  import ConfirmDialog from '$lib/inventory/ConfirmDialog.svelte';

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

  let edit = false;
  const editItem = () => {
    edit = !edit;
  }
  const confirmDelete = () => {
    toast.push({
      component: {
        src: ConfirmDialog,
        props: {
          message: 'Are you sure you want to delete this item?',
          itemId: item.id
        }
      },
      dismissable: false,
      initial: 0,
      theme: {
        '--toastBackground': '#3783F9',
        '--toastColor': 'white',
        '--toastBarHeight': 0
      }
    });
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
{#if edit}
  <AddItem {item} />
{/if}
<button on:click={addToToday} title='Add to Daily Total'>➕</button><!--add to daily total -->
<button on:click={editItem} title='Edit Item'>✏️</button> <!-- edit  -->
<button title='Add to Recipe'>📑</button> <!-- add to recipe -->
<button on:click={confirmDelete} title='Delete Item from Inventory'>🗑️</button> <!-- remove from db -->

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
