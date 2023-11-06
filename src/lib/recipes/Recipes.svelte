<script>
  import { today, recipes, inventory, formattedRecipes } from '$stores/stores.js';
  import RecipeForm from './RecipeForm.svelte';
  import RecipeItem from './RecipeItem.svelte';

  let showAddForm = false;
  let editing = undefined;

  const editItem = (recipe) => {
    showAddForm = false;
    editing = recipe;
  }
</script>

<button on:click={() => { showAddForm = !showAddForm; editing = undefined; }}>Add Recipe</button>

{#if showAddForm}
  <RecipeForm inventoryItems={ $inventory } submitCallback={() => { showAddForm = false; editing = undefined }} />
{/if}

<h3>Recipes</h3>
<ul>
{#await Promise.all( $formattedRecipes ) then formatted}
    {#each formatted.slice().reverse() as recipe}
      <li>
        {#if editing?.id === recipe.id}
          <RecipeForm {recipe} inventoryItems={ $inventory } submitCallback={() => editing = false} />
        {:else}
          <RecipeItem {recipe} />
          <button on:click={editItem(recipe)} title="Edit Recipe">✏️</button> <!-- edit  -->
        {/if}
      </li>
    {/each}
{/await}
</ul>

<style>
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
  li button {
    margin: 0 .5rem;
  }
</style>
