<script>
  import { list } from '$utils/nutrients';

  export let nutrients = [];
  export let validated = true;
</script>

<div class="col-start-1 col-end-4">
  <hr>
  <h4 class="ml-0">
    Nutrients
  </h4>
  <em>Enter quantities based on individual serving size</em>
  <fieldset class="col-start-1 col-end-4 flex flex-row flex-wrap justify-center gap-15px border-none m-0 px-1 py-0">
    {#if !validated}
      <div class="block w-full p-4 bg-[#794949]">At least one nutrient is required!</div>
    {/if}
    {#each list as nutrient}
      <span class="p-1 nutrient {nutrient.key}">
        <label class="block" for="{nutrient.key}">{nutrient.name}</label>
        {#if nutrients.length && nutrients.find(({ key }) => key === nutrient.key )}
          <input class="block" id="{nutrient.key}" name="{nutrient.key}" type="text" placeholder="{nutrient.unit}" value="{nutrients.find(({ key }) => key === nutrient.key ).quantity}"/>
        {:else}
          <input class="block" id="{nutrient.key}" name="{nutrient.key}" type="text" placeholder="{nutrient.unit}" value=""/>
        {/if}
      </span>
    {/each}
  </fieldset>
  <hr>
</div>

<style>

  @media screen and (max-width: 540px) {
    .nutrient {
      width: 100%;
      margin: 0 auto;
    }
    .nutrient label, .nutrient input {
      width: 100%;
    }
  }
</style>
