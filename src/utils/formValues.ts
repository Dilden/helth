import { list } from './nutrients';


// Return non-empty values from form data
// & exclude submit buttons
export const formValues = (formCollection: HTMLFormElement): Array<HTMLInputElement> => {
  const formFields: HTMLFormControlsCollection = formCollection.elements;
  const values = Array.from(formFields).filter((item) => { 
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

// Convert Recipe Form Data into object
export const formatRecipeFormValues = (formData: HTMLFormElement): Recipe => {
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
  <Recipe>{
    name: '',
    description: '',
    items: [] as RecipeItem[]
  });
}

// Convert Inventory Form Data into object
export const formatInventoryFormValues = (formData: HTMLFormElement): InventoryItem => {
  return formValues( formData )
  .reduce((accum, { name, value }) => {
    switch(name) {
      case 'id':
        accum.id = Number( value );
        break;
      case 'barcode':
        accum.barcode = Number( value );
        break;
      case 'description':
        accum.description = value ;
        break;
      case 'name':
        accum.name = value ;
        break;
      default:
        const found = list.find((nutrient: Nutrient) => nutrient.key === name);

        if(found) {
          accum.nutrients.push({
            key: found.key,
            name: found.name,
            quantity: Number( value ),
            unit: found.unit
          } as Nutrient)
        }
        break;
    }
    return accum;
  }, 
  <InventoryItem>{
    name: '',
    description: '',
    barcode: null,
    nutrients: [] as Nutrient[]
  });
}
