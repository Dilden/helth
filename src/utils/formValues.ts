import { list } from './nutrients';

export const formValues = (formCollection: HTMLFormElement): Array<HTMLInputElement> => {
  const formFields: HTMLFormControlsCollection = formCollection.elements;
  
  const values = Object.values(formFields).filter((item) => { 
    const ele = item as HTMLInputElement;
    if(ele.type !== 'submit' && ele.value) {
      return true;
    }
    else {
      return false;
    }
  });

  return values as Array<HTMLInputElement>;
}

export const formatRecipeFormValues = (formData: HTMLFormElement): RecipeValues => {
  return formValues( formData )
  .reduce((accum, { name, value, type, checked }) => {
    if( type === 'checkbox' && checked) {
      accum.items.push({id: Number( value )});
    }
    else {
      switch(name) {
        case 'id':
          accum.id = Number(value);
          break;
        case 'name':
          accum.name = value;
          break;
        case 'description':
          accum.description = value;
          break;
      }
    }
    return accum;
  }, 
  {
    id: 0,
    name: '',
    description: '',
    items: [] as RecipeItem[]
  });
}

export const formatInventoryFormValues = (formData: HTMLFormElement) => {
  return formValues( formData )
  .reduce((accum, { name, value }) => {
    switch(name) {
      case 'name':
        accum.name = value;
        break;
      case 'description':
        accum.description = value;
        break;
      case 'barcode':
        accum.barcode = value;
        break;
      case 'id':
        accum.id = Number(value);
        break;
      default:
        accum.nutrients[name] = {
          name: list[name].name,
          quantity: value,
          unit: list[name].unit
        }
        break;
    }
    return accum;
  }, 
  {
    id: 0,
    name: '',
    description: '',
    barcode: '',
    nutrients: {}
  });
}
