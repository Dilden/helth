import { type Dexie } from 'dexie';
import { list } from '$utils/nutrients';

export function migrate(db: Dexie): void {
	db.version(1).stores({
		journal: 'date, water, calories, protein, sodium',
		settings: 'name, value',
		limits: 'name, value',
		goals: 'name, value'
	});

	db.version(2).stores({
		inventory: '++id, &barcode, name, description, nutrients'
	});
	db.version(3).stores({
		recipes: '++id, name, description, items'
	});

	// https://dexie.org/docs/Tutorial/Design#database-versioning
	// Old
	db.version(4)
		.stores({ inventory: '++id, &barcode, name, description' })
		.upgrade((data) => {
			return data
				.table('inventory')
				.toCollection()
				.modify((item) => {
					const asArray = Object.entries(item.nutrients).map(([index, value]) => {
						const obj = { ...(value as Nutrient) };
						obj.key = index;
						obj.quantity = Number(obj.quantity);
						return obj;
					});
					item.nutrients = asArray;
				});
		});

	// Keep one settings object per nutrient
	db.version(5)
		.stores({ settings: 'name, value' })
		.upgrade((data) => {
			return data
				.table('settings')
				.toCollection()
				.modify((option) => {
					option.name = option.name.replace('Interval', '');
					option.value = { interval: option.value, enabled: true };
				});
		});

	db.version(6)
		.stores({ settings: 'name, value' })
		.upgrade((data) => {
			return data
				.table('settings')
				.toCollection()
				.modify((option) => {
					const pos = list.findIndex((nutrient) => option.name === nutrient.key);
					if (!option.value.position) {
						option.value.position = pos;
					}
				});
		});

	// move data to temp tables to change PK
	db.version(7)
		.stores({
			inventory: null,
			inventoryTemp: 'id, barcode, name, description',
			recipes: null,
			recipesTemp: 'id, name, description, items'
		})
		.upgrade(async (tx) => {
			const inv = await tx.table('inventory').toArray();
			const rec = await tx.table('recipes').toArray();

			await tx.table('inventoryTemp').bulkAdd(inv);
			await tx.table('recipesTemp').bulkAdd(rec);
		});

	// drop temp tables allowing for new PK
	// give each record a UID
	db.version(8)
		.stores({
			inventoryTemp: null,
			inventory: '&id, barcode, name, description',
			recipesTemp: null,
			recipes: '&id, name, description, items'
		})
		.upgrade(async (tx) => {
			const inv = await tx.table('inventoryTemp').toArray();
			const rec = await tx.table('recipesTemp').toArray();

			await tx.table('inventory').bulkAdd(inv);
			await tx.table('recipes').bulkAdd(rec);

			await tx
				.table('inventory')
				.toCollection()
				.modify(async (record) => {
					record.uid = crypto.randomUUID();
				});
			await tx
				.table('recipes')
				.toCollection()
				.modify(async (record) => {
					record.uid = crypto.randomUUID();
				});
		});

	// find all IDs from inventory
	// set recipes.items[].id to inventory item.uid
	// set recipes.id to uid
	// set inventory.id to uid
	db.version(9)
		.stores({
			inventory: '&id, barcode, name, description, created',
			recipes: '&id, name, description, items, created'
		})
		.upgrade(async (tx) => {
			const inv = await tx.table('inventory').toArray();
			inv.forEach(async (item) => {
				await tx
					.table('recipes')
					.toCollection()
					.modify((recipe) => {
						recipe.items = recipe.items.map((recipeItem: InventoryItem) => {
							if (recipeItem.id === item.id) {
								recipeItem.id = item.uid;
							}
							return recipeItem;
						});
					});
			});

			// set id = uid
			const createdAt = new Date();
			await tx
				.table('recipes')
				.toCollection()
				.modify((record) => {
					record.created = createdAt.getTime() + record.id;
					record.id = record.uid;
					delete record.uid;
				});

			await tx
				.table('inventory')
				.toCollection()
				.modify((record) => {
					record.created = createdAt.getTime() + record.id;
					record.id = record.uid;
					delete record.uid;
				});
		});
	db.version(10)
		.stores({
			settings: null,
			settingsTemp: '@id, name',
			goals: null,
			goalsTemp: '@id, name',
			limits: null,
			limitsTemp: '@id, name'
		})
		.upgrade(async (tx) => {
			const settings = await tx.table('settings').toArray();
			const goals = await tx.table('goals').toArray();
			const limits = await tx.table('limits').toArray();

			await tx.table('settingsTemp').bulkAdd(settings);
			await tx.table('goalsTemp').bulkAdd(goals);
			await tx.table('limitsTemp').bulkAdd(limits);
		});

	db.version(11)
		.stores({
			settingsTemp: null,
			settings: '@id, name',
			goalsTemp: null,
			goals: '@id, name',
			limitsTemp: null,
			limits: '@id, name'
		})
		.upgrade(async (tx) => {
			const settings = await tx.table('settingsTemp').toArray();
			const goals = await tx.table('goalsTemp').toArray();
			const limits = await tx.table('limitsTemp').toArray();

			await tx.table('settings').bulkAdd(settings);
			await tx.table('goals').bulkAdd(goals);
			await tx.table('limits').bulkAdd(limits);
		});
}
