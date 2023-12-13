<script>
  import { nutrientSumsFromList } from '$utils/item';
  import { confirmDialog, successToast, errorToast} from '$utils/toast.js';
  import { recipes, today } from '$stores/stores.js';

  export let recipe = {};

  const itemNutrientSums = nutrientSumsFromList(recipe.items);

  const confirmDelete = () => {
    confirmDialog('Are you sure you want to delete this item?', deleteRecipe, () => false);
  }

  const addToToday = () => {
    try {
      itemNutrientSums.map((index) => { 
        $today[index.key] = $today[index.key] || 0;
        $today[index.key] = $today[index.key] + index.quantity; 
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
<div class="description">{recipe.description}</div>
<div>
  <ul class="items">
    {#each recipe.items as item}
      <li>
        {item.name}
      </li>
    {/each}
  </ul>
  <ul class="nutrients">
    {#each itemNutrientSums as nutrient}
      <li>{nutrient.name + ': ' + nutrient.quantity + nutrient.unit}</li>
    {/each}
  </ul>
</div>
<!-- remove from db -->
<button on:click={confirmDelete} title="Delete Recipe">🗑️</button> 
<!--add to daily total -->
<button on:click={addToToday} title="Add to Daily Total">➕</button>

<style>
  h4 {
    margin-left: 0;
    margin-bottom: .2em 0;
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
  .items li {
    font-size: 1em;
  }
  button {
    margin: 0 .5rem;
  }
  @media screen and (max-width: 900px) {
    ul {
      text-align: left;
      padding-left: 0;
    }
    h4 {
      margin: .2em 0;
    }
  }
</style>
