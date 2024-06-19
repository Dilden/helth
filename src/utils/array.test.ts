import { describe, it, expect } from 'vitest';
import { swap } from './array';

describe('array fun', () => {
	it('swaps two numbers in an array', () => {
		const sample = [1, 2, 3, 4];
		expect(swap(sample, 0, 1)).toEqual([2, 1, 3, 4]);
	});

	it('swaps two letters in an array', () => {
		const sample = ['a', 'b', 'c', 'd'];
		expect(swap(sample, 0, 3)).toEqual(['d', 'b', 'c', 'a']);
	});
});
