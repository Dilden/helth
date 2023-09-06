<script>
  import { inventory } from '$stores/stores.js';
  import { formValues } from '$utils/formValues.js';

  import AddNutrientInputs from './AddNutrientInputs.svelte';
  let formVisible = false;

  const handleSubmit = async (event) => {
    const vals = formValues( event.target );
    $inventory = vals;
    event.target.reset();
  }

</script>

<button class='addItem' on:click|preventDefault={() => (formVisible = !formVisible)}>Add Item</button>

<form name='AddItem' on:submit|preventDefault={handleSubmit} class={formVisible ? 'showForm' : ''} >
  <span class='name'>
    <label for='name'>Name</label>
    <input type='text' id='name' name='name' required/>
  </span>

  <span class='description'>
    <label for='description'>Description</label>
    <input type='textarea' id='description' name='description' required/>
  </span>

  <span class='barcode'>
    <label for='barcode' >Barcode</label>
    <input type='text' id='barcode' name='barcode' placeholder='UPC/Unique ID' />
  </span>
  <AddNutrientInputs />
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
  form input, form label {
    margin: .5rem;
    display: block;
  }
  form .name {
    grid-column-start: 1;
    grid-column-end: 2;
  }
  form .description {
    grid-column-start: 2;
    grid-column-end: 3;
  }
  form .barcode {
    grid-column-start: 3;
    grid-column-end: 4;
  }
  form input[type='submit'] {
    grid-column-start: 2;
    grid-column-end: 3;
  }
  .showForm {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 5fr .5fr;
  }
</style>
