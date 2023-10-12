<script>
  import { recipes } from '$stores/stores.js';
  import { getItemByIdFromTable } from '$stores/db.js';
</script>

<h3>Recipes</h3>
<ul>
  {#await recipes.init() then }
    {#if $recipes.length}
      {#each $recipes as recipe}
        <li>{recipe.name}</li>
        {#each recipe.items as item}
          {#await getItemByIdFromTable('inventory', item.id) then inventoryItem}
            <p>
              {inventoryItem.name}
            </p>
          {/await}
        {/each}
      {/each}
    {/if}
  {/await}
</ul>
