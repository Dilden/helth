<script>
  import { nutrientSumsFromList } from '$utils/item.js';
  import { list } from '$utils/nutrients.js';

  export let name = '';
  export let items = [];
  
</script>
<h4>{name}</h4>
<div>
  {#each items as item}
    <span>
      {item.name}
    </span>
  {/each}
  <ul>
    {#each Object.entries(nutrientSumsFromList(items)) as nutrient}
      <li>{list[nutrient[0]].name + ': ' + nutrient[1] + list[nutrient[0]].unit}</li>
    {/each}
  </ul>
</div>

