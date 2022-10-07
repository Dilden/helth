<script>
  import ExportData from '$components/data/ExportData.svelte';
  import ImportData from '$components/data/ImportData.svelte';
</script>

<div class="container">
  <span><ExportData /></span>
  <span><ImportData /></span>
</div>

<style>
  .container {
    padding: 30px;
    text-align: center;
  }
  .container span {
    margin: 10px;
  }
</style>
