import { list } from '$utils/nutrients.js';

export const formValues = (formCollection) => {
  const formFields = formCollection.elements;

  const values = Object.values(formFields)
  .filter((item) => (item.type !== 'submit'))
  .filter((item) => (item.value))

  return values;
}

export const formatRecipeFormValues = (formData) => {
  return formValues( formData )
  .reduce((accum, current) => {
    if( current.type==='checkbox' && current.checked ) {
      accum['items'] = accum['items'] || [];

      accum['items'].push({id: Number( current.value )});
    }
    else {
      // if(current.name === 'id') {
      //   accum[current.name] = Number(current.value);
      // } else {
        accum[current.name] = current.value
      // }
    }
    return accum;
  }, {});
}

export const formatInventoryFormValues = (formData) => {
  return formValues( formData )
  .reduce((accum, current) => {
    if( current.name!=='name' && current.name!=='description' && current.name!=='barcode' && current.name!=='id' ) {
      // if nutrients doesn't exist, create it
      accum['nutrients'] = accum['nutrients'] || {};

      accum['nutrients'][current.name] = {
        name: list[current.name].name,
        quantity: current.value,
        unit: list[current.name].unit
      };
    }
    else {
      if(current.name === 'id') {
        accum[current.name] = Number(current.value);
      } else {
        accum[current.name] = current.value
      }
    }
    return accum;
  }, {});
}
