<script>
  import { nutrientSumsFromList } from '$utils/item.js';
  import { list } from '$utils/nutrients.js';

  export let name = '';
  export let description = '';
  export let items = [];
</script>
<h4>{name}</h4>
<p>{description}</p>
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

<style>
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
  .items li {
    font-size: 1em;
  }
</style>
