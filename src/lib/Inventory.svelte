<script>
  import { getInventory } from '$stores/db';
  import Spinner from '$lib/Spinner.svelte';

</script>

{#await getInventory()}
  <Spinner />
{:then inventory}
  <ul>
  {#each inventory as item}
    <li>
      <h4>{item.title}</h4>
      <button title='Add to Daily Total'>➕</button><!--add to daily total -->
      <button title='Edit Item'>🖉</button> <!-- edit  -->
      <button title='Add to Recipe'>📑</button> <!-- add to recipe -->
      <button class='delete' title='Delete'>🗑️</button> <!-- add to recipe -->
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
