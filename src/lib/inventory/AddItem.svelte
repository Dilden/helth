<script>
  import { inventory } from '$stores/stores.js';
  import { formValues } from '$utils/formValues.js';
  import AddNutrientInputs from './AddNutrientInputs.svelte';

  export let item = {};

  const handleSubmit = (event) => {
    const vals = formValues( event.target );
    $inventory = vals;
    event.target.reset();
  }
</script>

<form name="AddItem" on:submit|preventDefault={handleSubmit} >
  <input type="hidden" id="id" name="id" value={( item.id ? item.id : "" )} />
  <span class="name">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" value={( item.name ? item.name : "" )} required/>
  </span>

  <span class="description">
    <label for="description">Description</label>
    <input type="text" id="description" name="description" value={( item.description ? item.description : "")} required/>
  </span>

  <span class="barcode">
    <label for="barcode" >Barcode</label>
    <input type="text" id="barcode" name="barcode" value={(item.barcode ? item.barcode : "")} placeholder="UPC/Unique ID" />
  </span>
  <AddNutrientInputs nutrients={(item.nutrients ? item.nutrients : {})}/>
  <input type="submit" value="Save" />
</form>

<style>
  form {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 5fr .5fr;
    margin: 1rem;
  }
  form input, form label {
    margin: .5rem;
    display: block;
  }
  .id {
    display: none;
  }
  .name {
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .description {
    grid-column-start: 2;
    grid-column-end: 3;
  }
  .barcode {
    grid-column-start: 3;
    grid-column-end: 4;
  }
  input[type='submit'] {
    grid-column-start: 2;
    grid-column-end: 3;
  }
  @media screen and (max-width: 900px) {
    form {
      grid-template-columns: 1fr;
      grid-template-rows: .25fr .25fr .25fr 5fr .25fr;
    }
    .name, .description, .barcode, input[type='submit'] {
      grid-column-start: 1;
      grid-column-end: 2;
    }
  }
</style>
