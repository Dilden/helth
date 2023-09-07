<script>
  export let item;
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
<button title='Add to Daily Total'>➕</button><!--add to daily total -->
<button title='Edit Item'>✏️</button> <!-- edit  -->
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
