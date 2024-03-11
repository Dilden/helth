export const nutrientSumsFromList = (itemList: InventoryItem[]): Nutrient[] => {
	const allNutrients = itemList.map((item) => item.nutrients).flat();

	const sums = allNutrients.reduce((accum: Nutrient[], current: Nutrient) => {
		const foundIndex = accum.findIndex(({ key }) => key === current.key);

		if (accum && accum[foundIndex]) {
			accum[foundIndex].quantity = Number(accum[foundIndex].quantity) + Number(current.quantity);
		} else {
			accum.push(current);
		}
		return accum;
	}, [] as Nutrient[]);

	return sums;
};

export const applyServings = (itemList: InventoryItem[]): InventoryItem[] => {
	return itemList.map((item) => {
		const nutrients = item.nutrients.map((nut) => {
			const quantity =
				nut.quantity && item.servings ? Math.round(nut.quantity * item.servings * 100) / 100 : 0;
			return { ...nut, quantity };
		});
		return { ...item, nutrients };
	});
};
