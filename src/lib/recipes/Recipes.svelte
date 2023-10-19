<script>
  import { recipes, inventory } from '$stores/stores.js';
  import { getItemByIdFromTable } from '$stores/db.js';
  import RecipeForm from './RecipeForm.svelte';

  let showForm = false;
</script>

<button on:click={() => (showForm = !showForm)}>Add Recipe</button>

<div class={(showForm ? 'showForm' : 'hideForm' )}>
  <RecipeForm inventoryItems={ $inventory } />
</div>

<h3>Recipes</h3>
<ul>
  {#await recipes.init() then }
    {#if $recipes.length}
      {#each $recipes as recipe}
        <li>{recipe.name}</li>
        {#each recipe.items as item}
          {#await getItemByIdFromTable('inventory', item.id) then inventoryItem}
            <p>
              {inventoryItem.name}
            </p>
          {/await}
        {/each}
      {/each}
    {/if}
  {/await}
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
</style>
