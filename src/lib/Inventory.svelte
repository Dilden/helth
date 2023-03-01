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
      <p>{item.description}</p>
    </li>
  {/each}
  </ul>
{/await}
<style>
  ul {
    list-style: none;
  }
  li {
  }
</style>
