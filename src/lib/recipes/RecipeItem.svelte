<script>
  import { nutrientSumsFromList } from '$utils/item.js';
  import { list } from '$utils/nutrients.js';
  import { confirmDialog, successToast, errorToast} from '$utils/toast.js';
  import { recipes, today } from '$stores/stores.js';

  export let recipe = {};

  const itemNutrientSums = nutrientSumsFromList(recipe.items);

  const confirmDelete = () => {
    confirmDialog('Are you sure you want to delete this item?', deleteRecipe, () => false);
  }

  const addToToday = () => {
    try {
      Object.keys(itemNutrientSums).map((index) => { 
        $today[index] = $today[index] || 0;
        $today[index] = $today[index] + Number(itemNutrientSums[index]); 
      });
      successToast('Added to daily total!')
    } catch (err) {
      errorToast('Error adding to total!')
    }
  }
  const deleteRecipe = () => {
    recipes.delete(recipe.id)
    .then(() => successToast('Removed recipe!'))
    .catch(() => errorToast('Error deleting recipe!'));
  }

</script>

<h4>{recipe.name}</h4>
<p>{recipe.description}</p>
<div>
  <ul class='items'>
    {#each recipe.items as item}
      <li>
        {item.name}
      </li>
    {/each}
  </ul>
  <ul class='nutrients'>
    {#each Object.entries(itemNutrientSums) as nutrient}
      {#if nutrient[1]}
        <li>{list[nutrient[0]].name + ': ' + nutrient[1] + list[nutrient[0]].unit}</li>
      {/if}
    {/each}
  </ul>
</div>
<!-- remove from db -->
<button on:click={confirmDelete} title="Delete Recipe">🗑️</button> 
<!--add to daily total -->
<button on:click={addToToday} title="Add to Daily Total">➕</button>

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
  button {
    margin: 0 .5rem;
  }
</style>
