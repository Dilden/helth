import { list } from '$utils/nutrients.js';

export const formValues = (formCollection) => {
  const formFields = formCollection.elements;

  const textValues = Object.values(formFields)
  .filter((item) => (item.type === 'text'))
  .filter((item) => (item.value))
  .reduce((accum, current) => {
    if( current.name!=='name' && current.name!=='description' && current.name!=='barcode' ) {
      // if nutrients doesn't exist, create it
      accum['nutrients'] = accum['nutrients'] || {};

      accum['nutrients'][current.name] = {
        name: list[current.name].name,
        quantity: current.value,
        unit: list[current.name].unit
      };
    }
    else {
      accum[current.name] = current.value
    }
    return accum;
  }, {});

  return textValues;
}
