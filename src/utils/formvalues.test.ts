import { describe, it, expect } from 'vitest';
import { formValues, formatInventoryFormValues, formatRecipeFormValues } from './formValues';

const sample = {
	elements: {
		0: {
			name: 'name',
			type: 'text',
			value: 'New inventory item'
		},
		1: {
			name: 'description',
			type: 'text',
			value: 'Item description'
		},
		2: {
			name: 'barcode',
			type: 'text',
			value: '123456789102'
		},
		3: {
			name: '',
			type: 'fieldset'
		},
		4: {
			name: 'calories',
			type: 'text',
			value: '100'
		},
		5: {
			name: 'added_sugars',
			type: 'text',
			value: '10'
		},
		6: {
			name: 'submit',
			type: 'submit',
			value: ''
		},
		length: 7
	}
};

const sampleRecipe = {
	elements: {
		0: {
			name: 'id',
			type: 'text',
			value: '10'
		},
		1: {
			name: 'name',
			type: 'text',
			value: 'pizza'
		},
		2: {
			name: 'description',
			type: 'text',
			value: 'friday night is pizza night'
		},
		3: {
			name: 'cheese',
			type: 'checkbox',
			value: '34',
			checked: true
		},
		4: {
			name: 'cheese-servings',
			type: 'number',
			value: '2'
		},
		5: {
			name: 'sauce',
			type: 'checkbox',
			value: '2',
			checked: true
		},
		6: {
			name: 'sauce-servings',
			type: 'number',
			value: '1'
		},
		7: {
			name: 'crust',
			type: 'checkbox',
			value: '106',
			checked: true
		},
		8: {
			name: 'crust-servings',
			type: 'number',
			value: '.25'
		},
		9: {
			name: 'pepsi',
			type: 'checkbox',
			value: '8',
			checked: false
		},
		10: {
			name: 'submit',
			type: 'submit',
			value: ''
		},
		length: 11
	}
};

describe('form values', () => {
	it('returns form input values except submit', () => {
		const results = formValues(sample as unknown as HTMLFormElement);
		expect(results).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ name: 'name' }),
				expect.objectContaining({ name: 'description' }),
				expect.objectContaining({ name: 'barcode' }),
				expect.objectContaining({ name: 'added_sugars' }),
				expect.objectContaining({ name: 'calories' })
			])
		);
	});
	it('returns an InventoryItem w/ nested nutrients array from the form values', async () => {
		const results = formatInventoryFormValues(sample as unknown as HTMLFormElement);
		expect(results).toEqual({
			name: 'New inventory item',
			description: 'Item description',
			barcode: '123456789102',
			nutrients: [
				{
					key: 'calories',
					name: 'Calories',
					quantity: 100,
					unit: 'kcal'
				},
				{
					key: 'added_sugars',
					name: 'Added Sugars',
					quantity: 10,
					unit: 'g'
				}
			]
		});
	});

	it('formats values from recipes form', () => {
		const results = formatRecipeFormValues(sampleRecipe as unknown as HTMLFormElement);
		expect(results).toEqual({
			id: '10',
			name: 'pizza',
			description: 'friday night is pizza night',
			items: [
				{ id: '34', servings: 2 },
				{ id: '2', servings: 1 },
				{ id: '106', servings: 0.25 }
			]
		});
	});
});
