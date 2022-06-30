// source: https://www.geeksforgeeks.org/how-to-convert-string-to-camel-case-in-javascript/
export const camelCase = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index)
  {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}
