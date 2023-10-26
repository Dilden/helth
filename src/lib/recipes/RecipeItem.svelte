<script>
  import { nutrientSumsFromList } from '$utils/item.js';
  import { list } from '$utils/nutrients.js';

  export let name = '';
  export let description = '';
  export let items = [];
</script>
<h4>{name}</h4>
<h5>{description}</h5>
<div>
  <div class='ingredientsTitle'>Ingredients: </div>
  <ul class='items'>
    {#each items as item}
      <li>
        {item.name}
      </li>
    {/each}
  </ul>
  <div class='nutrientsTitle'>Nutrients:</div>
  <ul class='nutrients'>
    {#each Object.entries(nutrientSumsFromList(items)) as nutrient}
      {#if nutrient[1]}
        <li>{list[nutrient[0]].name + ': ' + nutrient[1] + list[nutrient[0]].unit}</li>
      {/if}
    {/each}
  </ul>
</div>

<style>
  ul li {
    list-style-type: none;
    display: inline-block;
    padding: 0 1em;
  }
  /* .items li { */
  /*   display: inline-block; */
  /*   padding: 0 1em; */
  /* } */
</style>
