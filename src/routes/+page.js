import { getInventory } from '../stores/db.js';

export const ssr = false;

export function load() {
  return {
    inventory: getInventory()
  }
  // return {
  //   inventory: [
  //     {title: 'Coca-Cola'},
  //     {title: 'Pepsi'},
  //     {title: 'Monster'}
  //   ]
  // }
}
