/**
 * This function is used to create the signature hash that would 
 * be used by the store as a key to save each query data requested
 * 
 * @param {string} operation 
 * @param {object} config 
 */
export const createSignatureHash = (operation, config) =>
  `${operation}${JSON.stringify(config)}`;
