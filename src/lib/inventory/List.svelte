<script>
  import Item from './Item.svelte';
  export let inventory = [];

</script>

<h3>Saved Items</h3>
<ul aria-label='inventory-list'>
{#if inventory}
  {#each inventory as item}
    <li>
      <Item title={item.title} />
    </li>
  {/each}
{/if}
</ul>
<style>
  ul {
    list-style: none;
  }
  li {
    margin: .75rem;
  }
</style>
