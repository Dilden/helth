<script>
  import Item from './Item.svelte';
  // import { getInventory } from '$stores/db';
  // import Spinner from '$lib/Spinner.svelte';

  export let data = [];
</script>

<!-- {#await getInventory()} -->
<!--   <Spinner /> -->
<!-- {:then inventory} -->
  <ul>
  <h3>Saved Items</h3>
  {#each data as item}
    <li>
      <Item title={item.title} />
    </li>
  {/each}
  </ul>
<!-- {/await} -->
<style>
  ul {
    list-style: none;
  }
  li {
    margin: .75rem;
  }
</style>
