<script>
  import { recipes } from '$stores/stores.js';
  import { formatRecipeFormValues } from '$utils/formValues.js';
  
  export let recipe = {};
  export let inventoryItems = [];
  export let submitCallback = () => (false);
  
  let validated = true;

  const handleSubmit = (event) => {
    const vals = formatRecipeFormValues( event.target );
    if(vals?.items?.length) {
      $recipes = vals;
      event.target.reset();
      submitCallback();
      validated = true;
    }
    else {
      validated = false;
    }
  }
</script>
<form class="recipeForm" name="AddRecipe" on:submit|preventDefault={handleSubmit}>
  {#if recipe.id}
    <input type="hidden" id="id" name="id" value={recipe.id} />
  {/if}
  <span class="recipeName">
    <label for="recipeName">Recipe Name</label>
    <input type="text" id="recipeName" name="name" required value={( recipe.name ? recipe.name : "" )}/>
  </span>

  <span class="recipeDescription">
    <label for="recipeDescription">Recipe Description</label>
    <input type="text" id="recipeDescription" name="description" value={( recipe.description ? recipe.description : "" )} required/>
  </span>

  <div class="inventory">
  {#if !validated}
    <div class="invalid">At least one item must be selected!</div>
  {/if}
  {#each inventoryItems as item}
      <span class="inventoryItem">
        {#if recipe.items && recipe.items.map(item => item.id).includes(item.id) }
          <input checked type="checkbox" value={item.id} name={item.name} id="inventoryItem-{item.id}" />
        {:else}
          <input type="checkbox" value={item.id} name={item.name} id="inventoryItem-{item.id}" />
        {/if}
        <label for="inventoryItem-{item.id}">
          {item.name}
        </label>
      </span>
  {/each}
  </div>
  <input type="submit" value="{ recipe.id ? 'Update' : 'Save' }" />
</form>


<style>
  form {
    display: grid;
    grid-template-columns: .5fr 3fr 3fr .5fr;
    grid-template-rows: 1fr auto 1fr;
    margin: 1rem;
  }
  .recipeName {
    grid-column-start: 2;
    grid-column-end: 3;
  }
  .recipeDescription {
    grid-column-start: 3;
    grid-column-end: 4;
  }
  form input, form label {
    margin: .5rem auto;
    display: block;
    width: 90%;
  }
  input[type='submit'] {
    grid-column-start: 2;
    grid-column-end: 4;
    max-width: 40rem;
  }
  .inventory {
    overflow-y: scroll;
    grid-column-start: 2;
    grid-column-end: 4;
    margin-bottom: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 1em;
    max-height: 20rem;
  }
  .inventoryItem {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
  .invalid {
    background-color: #794949;
    display: block;
    width: 100%;
    padding: .5rem;
    grid-column-start: 1;
    grid-column-end: 6;
  }
  .inventoryItem input, .inventoryItem label {
    margin: 0;
  }
  .inventoryItem input {
    width: 10%;
    height: 1.2rem;
  }
  .inventoryItem label {
    width: 90%;
    padding-left: .5em;
  }

  @media screen and (max-width: 900px) {
    form {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 3fr 1fr;
    }
    .recipeName, .recipeDescription, .inventory, input[type='submit'] {
      grid-column-start: 1;
      grid-column-end: 2;
    }
  }
</style>
