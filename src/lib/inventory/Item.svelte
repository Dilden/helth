<script>
  export let name;
</script>

<h4>{name}</h4>
<button title='Add to Daily Total'>➕</button><!--add to daily total -->
<button title='Edit Item'>🖉</button> <!-- edit  -->
<button title='Add to Recipe'>📑</button> <!-- add to recipe -->
<button class='delete' title='Delete'>🗑️</button> <!-- remove from db -->

<style>
  .delete {
    float: right;
  }
</style>
