export const formValues = (formCollection) => {
  const formFields = formCollection.elements;

  const textValues = Object.values(formFields)
  .filter((item) => (item.type === 'text'))
  .filter((item) => (item.value))
  .reduce((accum, current) => {
    if( current.name!=='name' && current.name!=='description' && current.name!=='barcode' ) {
      if(!accum['nutrients']) {
        accum['nutrients'] = {};
      }
      accum['nutrients'][current.name] = current.value;
    }
    else {
      accum[current.name] = current.value
    }
    return accum;
  }, {});

  return textValues;
}
