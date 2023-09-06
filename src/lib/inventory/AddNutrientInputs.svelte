<script>
  import { list } from '$utils/nutrients.js';
</script>

<div class='nutrientInputs'>
  <hr>
  <h4>
    Nutrients
  </h4>
  <em>Enter quantities based on individual serving size</em>
  <div class='nutrientList'>
    {#each Object.keys(list) as nutrient, index}
      <span class='nutrient {nutrient} {index % 2 ? "even" : "odd"}'>
        <label for='{nutrient}'>{list[nutrient].name}</label>
        <input id='{nutrient}' name='{nutrient}' type='text' placeholder='{list[nutrient].unit}' value='{ list[nutrient].quantity }'/>
      </span>
    {/each}
  </div>
  <hr>
</div>

<style>
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
    max-height: 20 rem;
    overflow-y: scroll;
  }
  .nutrient {
    padding: .25rem;
    margin: .5rem;
  }
  .nutrient.odd {
    background-color: var(--secondary-back-color);
  }
  .nutrient label, .nutrient input {
    display: block;
  }
</style>
