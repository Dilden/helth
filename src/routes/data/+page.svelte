<script>
  import ExportData from '$components/data/ExportData.svelte';
  import ImportData from '$components/data/ImportData.svelte';
</script>

<div class="container">
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
