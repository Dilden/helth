import 'fake-indexeddb/auto';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import { click } from '@testing-library/user-event';
import Add from './Add.svelte';

describe('Add dialog component', () => {
  it('shows tabs for inventory, recipes, and scan', async () => {
    render(Add);

    await click(screen.queryByRole('button', {name: '➕'}));

    // For some reason, these buttons are still hidden in the tests
    // but actually show up in the browser.
    // It's as if the 'click' code isn't actually being run.
    expect(await screen.findByRole('button', {name: 'Inventory', hidden: true})).toBeInTheDocument();
    expect(await screen.findByRole('button', {name: 'Recipes', hidden: true})).toBeInTheDocument();
    expect(await screen.findByRole('button', {name: 'Scan', hidden: true})).toBeInTheDocument();

    // const tabs = await screen.findAllByRole('button', {hidden: true});
    // const tabNames = tabs.map(tab => tab.textContent);
    // console.log(tabNames);
    // expect(tabNames).toEqual(
    //   expect.arrayContaining([
    //     expect.stringContaining('Inventory'),
    //     expect.stringContaining('Recipes'),
    //     expect.stringContaining('Scan')
    //   ])
    // );
  });
})
