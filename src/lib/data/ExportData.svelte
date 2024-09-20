<script>
	import { db } from '$stores/db';
	import { exportDB } from 'dexie-export-import';
	import Spinner from '$lib/Spinner.svelte';

	let blobUrl = '';
	const exportData = async () => {
		const blob = await exportDB(db, { prettyJson: true });
		blobUrl = URL.createObjectURL(blob);
	};
</script>

{#await exportData()}
	<Spinner />
{:then}
	<a href={blobUrl} class="button" download="helth-app-export-{Date.now()}.json">Export Data</a>
{/await}
