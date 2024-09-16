<script>
	import { db, addDefaults } from '$stores/db';
	import { initStores } from '$stores/stores.js';
	import { importDB, peakImportFile } from 'dexie-export-import';
	import { errorToast, confirmDialog } from '$utils/toast.js';

	let progress = 0;

	const upload = async (event) => {
		const file = event.target.files[0];
		try {
			if (!file && file.length <= 0) {
				errorToast('Error importing file');
			}

			const meta = await peakImportFile(file);
			if (meta.formatName !== 'dexie') {
				errorToast('Invalid database format name');
			}

			confirmDialog(
				'Import will overwrite all existing data. Continue?',
				() => {
					proceed(file);
				},
				() => errorToast('Import cancelled')
			);
		} catch (err) {
			console.log('Contant developer with the following error: ' + { err });
		}
	};

	const proceed = async (file) => {
		await db.delete();
		await importDB(file, { progressCallback: updateProgress });
		await db.open().then(() => addDefaults());
		await initStores();
	};

	const updateProgress = ({ totalRows, completedRows }) => {
		progress = Math.round((completedRows / totalRows) * 100);
	};
</script>

<label for="data_upload" class="button">Import Data</label>
<input class="hidden" type="file" on:change={upload} id="data_upload" />
{#if progress}
	<div class="m-3">
		<label class="progress">
			<progress name="upload" value={progress}></progress>
		</label>
		{#if progress == 100}
			<p>Import complete!</p>
		{/if}
	</div>
{/if}

<style>
	div {
		margin: 10px 0;
	}
</style>
