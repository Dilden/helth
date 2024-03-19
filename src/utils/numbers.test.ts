import { describe, it, expect } from 'vitest';
import { toTwoDecimals } from './numbers';

describe('number utilities', () => {
	it('leaves an integer alone', () => {
		expect(toTwoDecimals(5)).toBe(5);
	});

	it('leaves a number with two decimals alone', () => {
		expect(toTwoDecimals(5.55)).toBe(5.55);
	});
	it('truncates long decimals', () => {
		expect(toTwoDecimals(3.33333)).toBe(3.33);
	});
});
