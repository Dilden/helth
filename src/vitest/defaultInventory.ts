export const defaultInventory = [
	{
		id: 1,
		name: 'Coca-Cola',
		description: 'a carbonated beverage that will rot your teeth',
		nutrients: [
			{
				key: 'calories',
				name: 'Calories',
				quantity: '200',
				unit: 'kcal'
			},
			{
				key: 'added_sugars',
				name: 'Added Sugars',
				quantity: '300',
				unit: 'g'
			}
		]
	},
	{
		id: 2,
		name: 'Water',
		description: 'hydrohomie 4 life',
		nutrients: [
			{
				key: 'calories',
				name: 'Calories',
				quantity: '0',
				unit: 'kcal'
			}
		]
	},
	{
		id: 3,
		name: 'Syrup',
		description: 'sticky',
		nutrients: [
			{
				key: 'calories',
				name: 'Calories',
				quantity: '400',
				unit: 'kcal'
			}
		]
	}
];
