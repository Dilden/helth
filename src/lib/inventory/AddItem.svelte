<script>
  import AddNutrientInputs from './AddNutrientInputs.svelte';
  let formVisible = false;
  $: count = 0;

  const addNutrient = () => {
    count += 1;
    const element = new AddNutrientInputs({
      target: document.querySelector('.nutrientList'),
      props: {
        count: count
      }
    })
  }
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
  <button class='addNutrients' on:click|preventDefault={addNutrient}>Add Nutrient</button>
  <div class='nutrientList' use:addNutrient>
  </div>
  <hr>
  <input type='submit' value='Save' />
</form>

<style>
  .nutrientList {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }
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
