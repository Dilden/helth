import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { thePast } from './dates';

describe('date utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  })

  it('returns true if provided date is in the past', () => {
    const date: Date = new Date(2000, 1, 1, 1);
    vi.setSystemTime(date);


    const past: Date = new Date(1999, 1, 1, 1);
    expect(thePast(past)).toBe(true);
  })

  it('returns false if provided date is in the future', () => {
    const date: Date = new Date(2000, 1, 1, 1);
    vi.setSystemTime(date);


    const future: Date = new Date(2000, 1, 1, 2);
    expect(thePast(future)).toBe(false);
  })
})
