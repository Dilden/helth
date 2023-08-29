<script>
  let formVisible = false;
  const blank = {name: '', quantity: ''};
  $: nutrientList = [blank];
</script>

<button class='addItem' on:click|preventDefault={() => (formVisible = !formVisible)}>Add Item</button>

<form name='AddItem' method='POST' class={formVisible ? 'showForm' : ''} >
  <label for='title'>Title</label>
  <input type='text' id='title' name='title'/>

  <label for='barcode'>Barcode</label>
  <input type='text' id='barcode' name='barcode'/>

  <label for='description'>Description</label>
  <input type='textarea' id='description' name='description'/>
  <hr>
  <button class='addNutrients' on:click|preventDefault={() => (nutrientList.push(blank))}>Add Nutrient</button>
  {#each nutrientList as nutrient, index}
    <label for='description-'{index}>Nutrient:</label>
    <input type='text' id='description-'{index} name='description'/>
    <label for='quantity-'{index}>Quantity:</label>
    <input type='text' id='quantity-'{index} name='quantity'/>
  {/each}
  <hr>
  <input type='submit' value='Save' />
</form>

<style>
  .addItem {
    float: right;
    margin: 1rem;
  }
  form {
    display: none;
    margin: 1rem;
  }
  form input {
    display: inline-block;
    margin: .5rem;
  }
  .showForm {
    display: block;
  }
</style>
