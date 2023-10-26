<script>
  import { recipes, inventory } from '$stores/stores.js';
  import { lookupItems } from '$utils/recipe.js';
  import RecipeForm from './RecipeForm.svelte';
  import RecipeItem from './RecipeItem.svelte';
  import { onMount } from 'svelte';

  let showForm = false;
  $: formattedRecipes = [];

  onMount(async () => {
    await recipes.init();
    formattedRecipes = await Promise.all(attachItems());
  })

  const attachItems = () => {
    return $recipes.map(async ( recipe ) => {
      const items = await lookupItems(recipe);
      recipe.items = await Promise.all(items);
      return recipe;
    })
  }
</script>

<button on:click={() => (showForm = !showForm)}>Add Recipe</button>

<div class={(showForm ? 'showForm' : 'hideForm' )}>
  <RecipeForm inventoryItems={ $inventory } />
</div>

<h3>Recipes</h3>
<ul>
  
  {#if formattedRecipes}
    {#each formattedRecipes as recipe}
      <li>
          <RecipeItem name={recipe.name} description={recipe.description} items={recipe.items} />
      </li>
    {/each}
  {/if}
</ul>

<style>
  .showForm {
    display: block;
  }
  .hideForm {
    display: none;
  }
  button {
    margin: 1rem;
  }
  ul {
    list-style: none;
    margin-bottom: 2rem;
    padding: 0;
  }
  ul li:nth-child(odd) {
    background: #1F2A2D;
  }
  li {
    margin: .75rem;
    padding: 1rem;
  }
</style>
