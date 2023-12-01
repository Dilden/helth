<script>
  import { formattedRecipes, recipeSearch, filteredInventory, searchTerm} from '$stores/stores.js';
  import RecipeForm from './RecipeForm.svelte';
  import RecipeItem from './RecipeItem.svelte';
  import Search from '$lib/misc/Search.svelte';

  let showAddForm = false;
  let editing = undefined;

  const editItem = (recipe) => {
    showAddForm = false;
    editing = recipe;
  }
</script>

<button on:click|preventDefault={() => { showAddForm = !showAddForm; editing = undefined; }}>{(!showAddForm ? 'Add Recipe': 'Cancel')}</button>

{#if showAddForm}
  <div class="search">
    <Search searchTitle='Search inventory' bind:searchStoreVal={$searchTerm} scrollTo={false}/>
  </div>
  {#await Promise.all( $filteredInventory ) then filtered}
    <RecipeForm inventoryItems={ filtered.slice().reverse() } submitCallback={() => { showAddForm = false; editing = undefined }} />
  {/await}
{/if}


<div class="recipes">
  <h3>Recipes</h3>
  <div class="search_bar">
    <Search bind:searchStoreVal={$recipeSearch} searchTitle='Search Recipes'/>
  </div>
  <ul>
    {#await Promise.all( $formattedRecipes ) then formatted}
      {#each formatted.slice().reverse() as recipe}
        <li>
          {#if editing?.id === recipe.id}
            <div class="search">
              <Search searchTitle='Search inventory' bind:searchStoreVal={$searchTerm} scrollTo={false}/>
            </div>
            <RecipeForm {recipe} inventoryItems={ $filteredInventory } submitCallback={() => editing = undefined} />
          {:else}
            <RecipeItem {recipe} />
            <button on:click|preventDefault={editItem(recipe)} title="Edit Recipe">✏️</button> <!-- edit  -->
          {/if}
        </li>
      {/each}
    {/await}
  </ul>
</div>

<style>
  .recipes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr auto;
  }
  button {
    margin: 1rem;
  }
  ul {
    list-style: none;
    margin-bottom: 2rem;
    padding: 0;
    grid-column-start: 1;
    grid-column-end: 3;
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
  .search_bar {
    margin: var(--universal-margin);
    margin-top: 0;
    position: relative;
  }
  @media screen and (max-width: 925px) {
    .recipes {
      grid-template-rows: 1fr 1fr auto;
      grid-template-columns: 1fr;
    }
    .search_bar, h3, ul {
      grid-column-start: 1;
      grid-column-end: 2;
    }
    li {
      padding: .5rem;
    }
  }
</style>
