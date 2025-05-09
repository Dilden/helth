import { exportDB, importInto } from 'dexie-export-import';
import { confirmDialog, successToast, errorToast } from '$utils/toast';
import { Dexie } from 'dexie';

export const cloudMigrate = async (db: Dexie) => {
	const recordsCount = await db.table('journal').count();
	const names = await Dexie.getDatabaseNames();

	if (recordsCount == 0 && names.includes('helthdb')) {
		confirmDialog(
			'helth.app has updated! This update required changes to how data was stored on your device. Would you like to migrate your old data to the new database now? All data will remain on your device either way.',
			() =>
				importExport('helthdb', db)
					.then(() => {
						successToast('Success! The app will reload with your data briefly...');
						setTimeout(() => location.reload(), 3000);
					})
					.catch((err) => {
						console.log(err);
						errorToast(
							'Whoops! Something went wrong. Try exporting your data from settings > data and then importing it again.'
						);
					}),
			() =>
				successToast(
					'Got it! You can always migrate old data later by going to settings > data, exporting the old database, and importing it into the new one.'
				)
		);
	}
};

const importExport = async (dbname: string, db: Dexie) => {
	const dbExport = await new Dexie(dbname).open();
	const blob = await exportDB(dbExport);
	return await importInto(db, blob, {
		acceptChangedPrimaryKey: true,
		acceptNameDiff: true,
		acceptVersionDiff: true,
		overwriteValues: true,
		clearTablesBeforeImport: true
	});
};
