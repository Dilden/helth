<script>
  import { list } from '$utils/nutrients';

  export let nutrients = [];
  export let validated = true;
</script>

<div class="nutrientInputs">
  <hr>
  <h4>
    Nutrients
  </h4>
  <em>Enter quantities based on individual serving size</em>
  <fieldset class="nutrientList">
    {#if !validated}
      <div class="invalid">At least one nutrient is required!</div>
    {/if}
    {#each list as nutrient}
      <span class="nutrient {nutrient.key}">
        <label for="{nutrient.key}">{nutrient.name}</label>
        {#if nutrients.length && nutrients.find(({ key }) => key === nutrient.key )}
          <input id="{nutrient.key}" name="{nutrient.key}" type="text" placeholder="{nutrient.unit}" value="{nutrients.find(({ key }) => key === nutrient.key ).quantity}"/>
        {:else}
          <input id="{nutrient.key}" name="{nutrient.key}" type="text" placeholder="{nutrient.unit}" value=""/>
        {/if}
      </span>
    {/each}
  </fieldset>
  <hr>
</div>

<style>
  h4 {
    margin-left: 0;
  }
  .nutrientInputs {
    grid-column-start: 1;
    grid-column-end: 4;
  }
  .nutrientList {
    grid-column-start: 1;
    grid-column-end: 4;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 15px;
    border: none;
    margin: 0;
    padding: .25rem 0;
  }
  .nutrient {
    padding: .25rem;
  }
  .nutrient label, .nutrient input {
    display: block;
  }

  .invalid {
    background-color: #794949;
    display: block;
    width: 100%;
    padding: 1rem;
  }
</style>
