<script>
  import ExportData from '$components/data/ExportData.svelte';
  import ImportData from '$components/data/ImportData.svelte';
  import { liveQuery } from 'dexie';
  import { addDay, db } from '$stores/db';
  import { browser } from '$app/environment';

  $: journal = liveQuery(async () => {
      if(browser) {
        return db.journal.toArray();
      }
      else {
        return [];
      }
    });

  $: today = liveQuery(async () => {
      if(browser) {
        return db.journal.orderBy('date').reverse().first();
      }
      else {
        return [];
      }
    });

</script>

<div class="container">
  <div><ExportData /></div>
  <div><ImportData /></div>
    <button on:click={addDay}>Add day</button>
    <hr>
    {#if $today}
      Today: {$today.calories}
    {/if}
    {#if $journal}
      <ul>
      {#each $journal as record (record.id)}
        <li>Calories: {record.calories} </li>
      {/each}
      </ul>
    {/if}
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
