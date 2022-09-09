/**
 * Convert a string to camel case
 * Ex: Hola a todos => holaATodos
 * 
 * @param {string} str: value to convert to camel case 
 * @returns  {string}
 */
 exports.toCamelCase = (str) => { 
  return str.toLowerCase().replace(/\s+(.)/g, (match, group1) => {
      return group1.toUpperCase().replace("-", "");
  }).replace(/\s+$/, '');
}
