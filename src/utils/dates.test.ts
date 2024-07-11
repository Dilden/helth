import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { thePast, zeroHours, toUtc, utcToHuman, addTimezoneOffset, isDST } from './dates';

describe('date utilities', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});
	afterEach(() => {
		vi.useRealTimers();
	});

	it('returns true if provided date is in the past', () => {
		const date: Date = new Date(2000, 1, 1, 1);
		vi.setSystemTime(date);

		const past: Date = new Date(1999, 1, 1, 1);
		expect(thePast(past)).toBe(true);
	});

	it('returns false if provided date is in the future', () => {
		const date: Date = new Date(2000, 1, 1, 1);
		vi.setSystemTime(date);

		const future: Date = new Date(2000, 1, 1, 2);
		expect(thePast(future)).toBe(false);
	});

	it('returns a timestamp', () => {
		const current = new Date('July 1, 2024 11:36:00');
		vi.setSystemTime(current);
		expect(zeroHours()).toEqual(1719810000000);
		expect(toUtc()).toEqual(1719810000000);
	});

	it('converts to human readable', () => {
		const current = new Date('July 1, 2024 11:36:00');
		vi.setSystemTime(current);
		expect(utcToHuman(1719810000000)).toEqual('7/1/2024');
	});
});

describe('DST', () => {
	it('returns false if Standard Time', () => {
		const jan1 = new Date('January 1, 2024 11:36:00');
		vi.setSystemTime(jan1);
		expect(isDST()).toBe(false);
	});
	it('returns true if DST', () => {
		const jul1 = new Date('Jul 1, 2024 11:36:00');
		vi.setSystemTime(jul1);
		expect(isDST()).toBe(true);
	});

	// if current date is DST && date to check is DST, only do getTimeZoneOffset * 60k
	// if current date is DST && date to check is NOT DST, do getTimeZoneOffset * 60k + 1 hour
	// if current date is NOT DST and date to check is DST, do getTimeZoneOffset * 60k - 1 hour
	// if current date is NOT DST && date to check is NOT DST, do getTimeZoneOffset * 60k
	it('adds offset to DST timestamp when current date is DST', () => {
		const current = new Date('July 1, 2024 11:36:00');
		vi.setSystemTime(current);

		const dst = new Date('June 1, 2024 11:36:00');
		expect(addTimezoneOffset(toUtc(dst))).toEqual(1717236000000);
	});
	it('adds the offset to ST timestamp when current date is ST', () => {
		const current = new Date('January 1, 2024 11:36:00');
		vi.setSystemTime(current);
		expect(addTimezoneOffset(toUtc(current))).toEqual(1704110400000);
	});
	it('adds the offset to ST timestamp when current date is DST', () => {
		const current = new Date('July 1, 2024 11:36:00');
		vi.setSystemTime(current);

		const st = new Date('January 1, 2024 11:36:00');
		expect(addTimezoneOffset(toUtc(st))).toEqual(1704110400000);
	});
	it('adds the offset to DST timestamp when current date is ST', () => {
		const current = new Date('January 1, 2024 11:36:00');
		vi.setSystemTime(current);

		const dst = new Date('June 1, 2024 11:36:00');
		expect(addTimezoneOffset(toUtc(dst))).toEqual(1717236000000);
	});
});
