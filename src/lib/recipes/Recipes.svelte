<script>
  import { recipes } from '$stores/stores.js';
</script>

<h3>Recipes</h3>
<ul>
  <!-- {#await recipes.init()} -->
      <!-- waiting... -->
  <!-- {:then} -->
    before if
    {#if $recipes.length}
      has length
      {#each $recipes as recipe}
        <li>{recipe.name}</li>
      {/each}
    {/if}
  <!-- {/await} -->
</ul>
