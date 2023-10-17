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
  <label for="recipeName">Recipe Name</label>
  <input type="text" id="recipeName" name="name" required/>

  <label for="recipeDescription">Recipe Description</label>
  <input type="text" id="recipeDescription" name="description" required/>

  {#each inventoryItems as item}
    <div>
      <input type='checkbox' value={item.id} name={item.name} id='inventoryItem-{item.id}'/>
      <label for='inventoryItem-{item.id}'>{item.name}</label>
    </div>
  {/each}
   
  <input type="submit" value="Save" />
</form>
