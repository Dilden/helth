import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import WorkRest from './WorkRest.svelte';

describe('work rest timer', () => {
  it('renders the timer', () => {
    render(WorkRest);
    expect(screen.getByText('start')).toHaveClass('start_button');
    expect(screen.getByText('stop')).toBeVisible();
    expect(screen.getByText('reset')).toBeVisible();
  })
})
