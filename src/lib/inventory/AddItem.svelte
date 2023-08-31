<script>
  import { addInventory } from '$stores/db.js';
  import { formValues } from '$utils/formValues.js';

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

  const handleSubmit = async (event) => {
    const vals = formValues( event.target );
    await addInventory(vals);
  }

</script>

<button class='addItem' on:click|preventDefault={() => (formVisible = !formVisible)}>Add Item</button>

<form name='AddItem' on:submit|preventDefault={handleSubmit} class={formVisible ? 'showForm' : ''} >
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
    max-height: 15rem;
    overflow-y: scroll;
  }
  .addItem {
    float: right;
    margin: 1rem;
  }
  .addNutrients {
    float: right;
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
