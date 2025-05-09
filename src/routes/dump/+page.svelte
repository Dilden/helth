<script>
	import { Dexie } from 'dexie';
	//
	// PREPARATION
	//

	// To make the sample more visible - replace window.console with one that shows the content on page
	// function Console() {
	// 	this.textarea = document.createElement('textarea');
	// 	this.log = function (txt, type) {
	// 		if (type) this.textarea.value += type + ' ';
	// 		this.textarea.value += txt + '\n';
	// 	};
	// 	this.error = function (txt) {
	// 		this.log(txt, 'ERROR!');
	// 	};
	// }
	// window.console = new Console();
	// document.addEventListener('DOMContentLoaded', function () {
	// 	document.getElementById('consoleArea').appendChild(console.textarea);
	// });

	//
	// SAMPLE CODE
	//
	// This sample shows how to iterate all databases at current origin and dump the version and schemas of each database.
	// If you run this sample on Chrome or Opera it will also be able to dump databases not created by Dexie. On IE and FF,
	// there is no native API to list existing databases, but Dexie is still capable of dumping the version and schema in
	// case you know the database names.
	//
	// The console output will be displayed in the form of javascript code, as how the database would be defined with Dexie.
	//
	// The code could be extended to also dump the objects from the database (see comment in code). Another posibility that would be
	// doable is to monitor the database live. That is possible if using the Dexie.Observable addon but it will only be capable
	// of monitoring other databases used with the Dexie.Observable addon applied. It would be possible to create a dynamic
	// view of the contents in DB that would automatically update the page directly as soon as an object is added, changed or
	// deleted.
	//
	// It is also possible to get notified when a database is added, deleted or upgraded. This is actually possible without
	// the Dexie.Observable addon. To get notified when databases are added or deleted, just listen to the window.onstorage
	// event and when the key "Dexie.DatabaseNames" changes. To listen to upgrades, just listen to Dexie event
	// db.on('versionchange'). The default behavior of that event is to close the database and reload the page. To override
	// this, return false from your subscriber function and instead do db.close(); db.open(); Then the database will reopen
	// to the new schema.

	let text = $state('');
	text += 'Dumping Databases\n';
	text += '=================\n';
	Dexie.getDatabaseNames(function (databaseNames) {
		if (databaseNames.length === 0) {
			// No databases at this origin as we know of.
			text += 'Could not find databases on current origin.';
			text += 'Was your database created without using Dexie? Try the [Add database] button above!';
		} else {
			// At least one database to dump
			dump(databaseNames);
		}

		function dump(databaseNames) {
			if (databaseNames.length > 0) {
				var db = new Dexie(databaseNames[1]);
				// Now, open database without specifying any version. This will make the database open any existing database and read its schema automatically.
				db.open()
					.then(function () {
						text += "var db = new Dexie('" + db.name + "');\n";
						text += 'db.version(' + db.verno + ').stores({\n';
						db.tables.forEach(function (table, i) {
							var primKeyAndIndexes = [table.schema.primKey].concat(table.schema.indexes);
							var schemaSyntax = primKeyAndIndexes
								.map(function (index) {
									return index.src;
								})
								.join(',');
							text +=
								'    ' +
								table.name +
								': ' +
								"'" +
								schemaSyntax +
								"'" +
								(i < db.tables.length - 1 ? ',\n' : '\n');
							// Note: We could also dump the objects here if we'd like to:
							//  table.each(function (object) {
							//      console.log(JSON.stringify(object));
							//  });
						});
						text += '});\n';
					})
					.finally(function () {
						db.close();
						dump(databaseNames.slice(1));
					});
			} else {
				text += 'Finished dumping databases \n';
				text += '========================== \n';
				text += 'Hint: Is your DB not listed? Try using the [Add database] button above!\n';
			}
		}
	});

	function addDatabase(ev) {
		const dbname = prompt('Enter name of a database on this origin (' + location.host + ')');
		if (!dbname) return; // User cancelled dialog
		text += 'Trying to open ' + dbname + '\n';
		return new Dexie(dbname, { addons: [] })
			.open()
			.then(function (db) {
				text += 'Database ' + dbname + ' found. Adding it to __dbnames db \n';
				db.close();
			})
			.then(function () {
				return new Dexie('__dbnames', { addons: [] }).open();
			})
			.then(function (db) {
				return db
					.table('dbnames')
					.put({ name: dbname })
					.then(function () {
						db.close();
					});
			})
			.then(function () {
				text += 'Succcessfully added ' + dbname + '. Please reload page to dump it! \n';
			})
			.catch(function (error) {
				text += 'Error opening DB!\n\n';
				text += error.message;
			});
	}
</script>

<div class="mt-5">
	<button onclick={addDatabase(event)}>Add database</button>
</div>
<pre id="consoleArea">{text}</pre>
