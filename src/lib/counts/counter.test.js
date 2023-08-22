import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Counter from './Counter.svelte';

describe('counter component', () => {
  it('renders a counter component with matching props', () => {
    render(Counter, {
      count: 10,
      title: 'counter test',
      interval: 4,
      max: 150,
      diffString: '100 calories remaining'
    });
    expect(screen.queryByText('counter test')).toBeVisible();
    expect(screen.queryByLabelText('Count value')).toHaveValue(10)
    expect(screen.queryByRole('button', { name: '-4'})).toBeVisible()
    expect(screen.queryByRole('button', { name: '+4'})).toBeVisible()
    expect(screen.queryByLabelText('interval', { type: 'range' })).toHaveValue('4')
  });

  it('changes the count value when a button is clicked', async () => {
    render(Counter, {
      count: 5,
      title: 'test',
      interval: 2
    });
    await screen.queryByRole('button', { name: '-2'}).click();
    expect(screen.queryByLabelText('Count value')).toHaveValue(3);
  })
});
