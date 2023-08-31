export const formValues = (formCollection) => {
  const formFields = formCollection.elements;

  let inventoryItem = {};
  const textValues = Object.values(formFields)
    .filter((item) => (item.type === 'text'))
    .map((item) => { 
      if(item.value) {
        inventoryItem[item.name] = item.value;
      }
    });

  return inventoryItem;
}
