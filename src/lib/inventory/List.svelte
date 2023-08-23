<script>
  import Item from './Item.svelte';
  import { getInventory } from '$stores/db';
  import Spinner from '$lib/Spinner.svelte';

</script>

{#await getInventory()}
  <Spinner />
{:then inventory}
  <ul>
  <h3>Saved Items</h3>
  {#each inventory as item}
    <li>
      <Item title={item.title} />
      <button title='Add to Daily Total'>➕</button><!--add to daily total -->
      <button title='Edit Item'>🖉</button> <!-- edit  -->
      <button title='Add to Recipe'>📑</button> <!-- add to recipe -->
      <button class='delete' title='Delete'>🗑️</button> <!-- remove from db -->
    </li>
  {/each}
  </ul>
{/await}
<style>
  ul {
    list-style: none;
  }
  li {
    margin: .75rem;
  }
  .delete {
    float: right;
  }
</style>
