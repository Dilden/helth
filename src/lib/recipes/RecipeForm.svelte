<script>
  import { recipes } from '$stores/stores.js';
  import { formatRecipeFormValues } from '$utils/formValues.js';
  export let inventoryItems = [];

  const handleSubmit = (event) => {
    // console.log(event.target);
    const vals = formatRecipeFormValues( event.target );
    $recipes = vals;
    event.target.reset();
  }
</script>
<form class="recipeForm" name="AddRecipe" on:submit|preventDefault={handleSubmit}>
  <span class="recipeName">
    <label for="recipeName">Recipe Name</label>
    <input type="text" id="recipeName" name="name" required/>
  </span>

  <span class="recipeDescription">
    <label for="recipeDescription">Recipe Description</label>
    <input type="text" id="recipeDescription" name="description" required/>
  </span>

  <div class="inventory">
  {#each inventoryItems as item}
      <span class="inventoryItem">
        <input type="checkbox" value={item.id} name={item.name} id="inventoryItem-{item.id}"/>
        <label for="inventoryItem-{item.id}">
          {item.name}
        </label>
      </span>
  {/each}
  </div>
  <input type="submit" value="Save" />
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
    /* align-items: stretch; */
    /* align-content: space-around; */
  }
  .inventoryItem {
    /* -webkit-box-flex: 1 1 auto; */
    /* -moz-box-flex: 1 1 auto; */
    /* -webkit-flex: 1 1 auto; */
    /* -ms-flex: 1 1 auto; */
    /* flex: 1 1 auto; */
    /* height: 100px; */
    margin: auto;
    width: auto;
    max-width: 150px;
    display: flex;
    flex: row nowrap;
    justify-content: flex-start;
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
