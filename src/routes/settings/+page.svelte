<script>
  import ExportData from '$lib/data/ExportData.svelte';
  import ImportData from '$lib/data/ImportData.svelte';
</script>

<div class="container">
  <h2>⚙️  settings </h2>
  <div><ExportData /></div>
  <div><ImportData /></div>
</div>

<style>
  .container {
    padding: 30px;
    text-align: center;
  }
  .container div {
    margin: 25px auto;
  }
</style>
