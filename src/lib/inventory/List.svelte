<script>
  import Item from './Item.svelte';
  export let data = [];

</script>

<ul>
<h3>Saved Items</h3>
{#if data.inventory}
  {#each data.inventory as item}
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
