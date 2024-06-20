import { it, expect, vi, afterAll } from 'vitest';
import DatePicker from './DatePicker.svelte';
import { render, screen, fireEvent } from '@testing-library/svelte';

const callback = vi.fn();

it('renders a date picker', () => {
	render(DatePicker);
	expect(screen.getByLabelText('Select date')).toBeVisible();
});

it('runs callback on selecting a date', async () => {
	render(DatePicker, { callback: callback });

	fireEvent.change(screen.getByLabelText('Select date'), { target: { value: '2024-06-19' } });
	expect(callback).toHaveBeenCalledOnce();
});

it('defaults to provided date', () => {
	render(DatePicker, { value: '2024-12-01' });

	expect(screen.getByLabelText('Select date')).toHaveValue('2024-12-01');
});

afterAll(() => {
	vi.restoreAllMocks();
});
