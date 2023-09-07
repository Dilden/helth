<script>
  export let item;
</script>

<h4>{item.name}</h4>
<div>
  {#if item.nutrients}
    {#each Object.values(item.nutrients) as nutrient}
{nutrient}
      <em>{nutrient.name}: {nutrient.quantity}{nutrient.unit}</em>
    {/each}
  {/if}
</div>
<button title='Add to Daily Total'>➕</button><!--add to daily total -->
<button title='Edit Item'>✏️</button> <!-- edit  -->
<button title='Add to Recipe'>📑</button> <!-- add to recipe -->
<button class='delete' title='Delete'>🗑️</button> <!-- remove from db -->

<style>
  .delete {
    float: right;
  }
</style>
