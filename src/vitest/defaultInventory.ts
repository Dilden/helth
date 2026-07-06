export const defaultInventory: Array<InventoryItem> = [
	{
		id: '1',
		name: 'Coca-Cola',
		description: 'a carbonated beverage that will rot your teeth',
		barcode: '111111111111',
		nutrients: [
			{
				key: 'calories',
				name: 'Calories',
				quantity: 200,
				unit: 'kcal'
			},
			{
				key: 'added_sugars',
				name: 'Added Sugars',
				quantity: 300,
				unit: 'g'
			}
		]
	},
	{
		id: '2',
		name: 'Water',
		description: 'hydrohomie 4 life',
		barcode: '222222222222',
		nutrients: [
			{
				key: 'calories',
				name: 'Calories',
				quantity: 0,
				unit: 'kcal'
			}
		]
	},
	{
		id: '3',
		name: 'Syrup',
		description: 'sticky',
		barcode: '333333333333',
		nutrients: [
			{
				key: 'calories',
				name: 'Calories',
				quantity: 400,
				unit: 'kcal'
			}
		]
	}
];

export const defaultRecipes = [
	{
		id: '4',
		name: 'toxic waste',
		description: 'heaping garbage dumpster fire',
		items: [
			{ id: 1, servings: 1 },
			{ id: 2, servings: 2 }
		]
	},
	{
		id: '5',
		name: 'beezchurger',
		description: 'yum yum',
		items: [
			{ id: 1, servings: 1 },
			{ id: 3, servings: 1.5 }
		]
	},
	{
		id: '6',
		name: 'gnarly mess',
		description: 'lorem ipsum',
		items: [
			{ id: 1, servings: 1 },
			{ id: 2, servings: 1 },
			{ id: 3, servings: 1 }
		]
	}
];
