<script lang="ts">
	import { db } from '$stores/db';
	import { exportDB } from 'dexie-export-import';
	import { Dexie } from 'dexie';
	import Spinner from '$lib/Spinner.svelte';

	let selectedDB = $state(db.name);

	let blobUrl = $derived.by(async () => {
		const dbExport = await new Dexie(selectedDB).open();
		const blob = await exportDB(dbExport, { prettyJson: true });
		return URL.createObjectURL(blob);
	});
</script>

<div class="flex flex-col gap-1">
	{#await blobUrl}
		<Spinner />
	{:then blob}
		<a href={blob} class="button" download="helth-app-export-{Date.now()}.json"
			>Export Data from {selectedDB}</a
		>
	{/await}
	{#await Dexie.getDatabaseNames()}
		<Spinner />
	{:then names}
		<select class="rounded-sm border-none px-3 py-1" bind:value={selectedDB}>
			{#each names as dbname}
				{#if dbname === db.name}
					<option value={dbname} selected>{dbname + ' <-- current'}</option>
				{:else}
					<option value={dbname}>{dbname}</option>
				{/if}
			{/each}
		</select>
	{/await}
</div>
