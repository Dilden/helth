<script>
  export let inventoryItems = [];
</script>
<form class='recipeForm'>
  <label for="recipeName">Recipe Name</label>
  <input type="text" id="recipeName" name="Recipe Name" required/>

  <label for="recipeDescription">Recipe Description</label>
  <input type="text" id="recipeDescription" name="Recipe Description" required/>

  {#each inventoryItems as item}
    <div>
      <label for='inventoryItem-{item.id}'>{item.name}</label>
      <input type='checkbox' value={item.id} name={item.name} id='inventoryItem-{item.id}'/>
    </div>
  {/each}
   
  <input type="submit" value="Save" />
</form>
