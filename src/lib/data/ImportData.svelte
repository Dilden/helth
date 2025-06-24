<script>
	import { db, addDefaults } from '$stores/db';
	import { initStores } from '$stores/stores.svelte';
	import { importInto, peakImportFile } from 'dexie-export-import';
	import { errorToast, confirmDialog } from '$utils/toast.js';

	let progress = $state(0);

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
			console.log('Contact developer with the following error: ' + { err });
		}
	};

	const proceed = async (file) => {
		// await db.delete();
		await importInto(db, file, {
			progressCallback: updateProgress,
			acceptChangedPrimaryKey: true,
			acceptNameDiff: true,
			acceptVersionDiff: true,
			overwriteValues: true,
			clearTablesBeforeImport: true,
			transform: (table, value, key) => {
				let val = {};
				let key1 = key ? key : '';

				switch (table) {
					case 'journal':
						const { id, ...rest } = { ...value };
						val = { ...rest };
						if (!val.date.toString().startsWith('#')) {
							val.date = '#' + val.date.toString();
						}
						key1 = 'date';
						break;
					case 'settings':
					case 'goals':
					case 'limits':
						val = { ...value };
						if (val.value === null) {
							val.value = 0;
						}
						if (!val.name.toString().startsWith('#')) {
							val.name = '#' + val.name;
						}
						key1 = 'name';
						break;
					default:
						val = value;
						key1 = 'id';
						break;
				}
				return { value: val, key: key1 };
			}
		}).catch((err) => console.error(err.message));
		await db.open().then(() => addDefaults());
		await initStores();
	};

	const updateProgress = ({ totalRows, completedRows }) => {
		progress = Math.round((completedRows / totalRows) * 100);
	};
</script>

<label for="data_upload" class="button">Import Data</label>
<input class="hidden" type="file" onchange={upload} id="data_upload" />
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
