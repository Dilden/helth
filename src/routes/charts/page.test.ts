// @ts-ignore
import 'fake-indexeddb/auto';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
// import userEvent from '@testing-library/user-event';
import Page from './+page.svelte';

describe('history range filters', () => {
	it('has a select/dropdown with options', () => {
		render(Page);
		expect(screen.getByLabelText('Show previous')).toHaveValue('7');
	});
});
