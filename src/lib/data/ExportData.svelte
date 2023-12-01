<script>
  import { db } from '$stores/db.js';
  import { exportDB } from 'dexie-export-import';
  import Spinner from '$lib/Spinner.svelte';

  let blobUrl = '';
  const exportData = async () => {
    const blob = await exportDB(db, {prettyJson: true});
    blobUrl = URL.createObjectURL(blob);
  }
</script>


{#await exportData()}
  <Spinner />
{:then}
  <a href="{blobUrl}" download="helth-app-export-{Date.now()}.json" >Export Your Data</a>
{/await}

<style>
  a {
    background: var(--a-link-color);
    color: var(--back-color);
    padding: 8px 20px;
    text-decoration: none;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  a:hover {
    background: var(--secondary-back-color);
  }
</style>
