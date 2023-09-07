<script>
  import Item from './Item.svelte';
  import Spinner from '$lib/Spinner.svelte';
  import { inventory } from '$stores/stores.js';
</script>

<h3>Saved Items</h3>
<ul aria-label='inventory-list'>
{#await inventory.init()}
  <Spinner />
{:then}
  {#if $inventory.length}
    {#each $inventory.reverse() as item}
      <li>
        <Item {item} />
      </li>
    {/each}
  {/if}
{:catch error}
  <p>Error displaying inventory: {error}</p>
{/await}
</ul>
<style>
  ul {
    list-style: none;
  }
  li {
    margin: .75rem;
  }
</style>
