<script>
  /** @type {{item?: any, checked?: boolean}} */
  let { item = {}, checked = false } = $props();
</script>

{#if checked }
  <input checked type="checkbox" value={item.id} name={item.name} id="inventoryItem-{item.id}" />
{:else}
  <input type="checkbox" value={item.id} name={item.name} id="inventoryItem-{item.id}" />
{/if}

<label for="inventoryItem-{item.id}">
  {item.name}
</label>

<style>
  input, label {
    margin: 0;
  }
  input {
    width: 1.2rem;
  }
  label {
    padding-left: .5em;
  }
</style>
