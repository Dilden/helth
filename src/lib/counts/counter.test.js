import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Counter from './Counter.svelte';

describe('counter component', () => {
  it('renders a counter component with matching props', () => {
    const title = 'counter test';
    render(Counter, {
      count: 10,
      title: title,
      interval: 4,
      max: 150,
      diffString: '100 calories remaining'
    });
    expect(screen.queryByText(title)).toBeVisible();
    expect(screen.queryByLabelText(`${title}`)).toHaveValue(10)
    expect(screen.queryByRole('button', { name: '-4'})).toBeVisible()
    expect(screen.queryByRole('button', { name: '+4'})).toBeVisible()
    expect(screen.queryByLabelText(`Adjust interval for ${title}`, { type: 'range' })).toHaveValue('4')
  });

  it('changes the count value when a button is clicked', async () => {
    const title = 'test';
    render(Counter, {
      count: 5,
      title: title,
      interval: 2
    });
    await screen.queryByRole('button', { name: '-2'}).click();
    expect(screen.queryByLabelText(`${title}`)).toHaveValue(3);
  })
});
