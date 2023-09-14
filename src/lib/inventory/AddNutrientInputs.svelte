<script>
  import { list } from '$utils/nutrients.js';

  export let nutrients = {};
</script>

<div class="nutrientInputs">
  <hr>
  <h4>
    Nutrients
  </h4>
  <em>Enter quantities based on individual serving size</em>
  <fieldset class="nutrientList">
    {#each Object.keys(list) as nutrient, index}
      <span class="nutrient {nutrient}">
        <label for="{nutrient}">{list[nutrient].name}</label>
        <input id="{nutrient}" name="{nutrient}" type="text" placeholder="{list[nutrient].unit}" value="{( nutrients[nutrient] ? nutrients[nutrient].quantity : '')}"/>
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
    max-height: 20 rem;
    overflow-y: scroll;
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
</style>
