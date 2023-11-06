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
      validated = true;
    }
    else {
      validated = false;
    }
    submitCallback();
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
    min-height: 120px;
    max-height: 450px;
    overflow-y: scroll;
    grid-column-start: 2;
    grid-column-end: 4;
    margin-bottom: 1rem;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    -moz-flex-flow: row wrap;
    -ms-flex-flow: row wrap;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
    justify-content: flex-start;
    gap: 10px;
  }
  .invalid {
    background-color: #794949;
    /* color: var(--secondary-fore-color); */
    display: block;
    width: 100%;
    padding: 1rem;
  }
  .inventoryItem {
    flex: 1 1 0px;
    margin: auto;
    width: auto;
    max-width: 150px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: stretch;
  }
  .inventoryItem input, .inventoryItem label {
    margin: 0;
  }
  .inventoryItem input {
    width: 10%;
    min-width: 20px;
    max-width: 25px;
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
