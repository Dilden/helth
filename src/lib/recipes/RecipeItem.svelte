<script>
  import { nutrientSumsFromList } from '$utils/item.js';
  import { list } from '$utils/nutrients.js';

  export let name = '';
  export let items = [];
  

</script>
<h4>{name}</h4>
<div>
  <ul class='items'>
    {#each items as item}
      <li>
        {item.name}
      </li>
    {/each}
  </ul>
  <ul class='nutrients'>
    {#each Object.entries(nutrientSumsFromList(items)) as nutrient}
      {#if nutrient[1]}
        <li>{list[nutrient[0]].name + ': ' + nutrient[1] + list[nutrient[0]].unit}</li>
      {/if}
    {/each}
  </ul>
</div>

