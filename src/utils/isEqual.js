/**
 * checks the equality of two objects by first checking te references
 * of the objects. If two objects evaluates to false based on the reference check
 * then we attempt to check the properties of each object
 *
 * N:B - This pattern of isEquality check isnt as sophisticated as that of lodash
 * or underscore, however it solves the current object equality check of the react-kunyora
 * component update lifecycle
 *
 * This file is also an attempt to remove dependency on lodash from the library
 * and manage all methods internally
 *
 * @param {Object} obj1 The first object to compare
 * @param {Object} obj2 The second object to compare
 */
export default function isEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  //check if any of the value evaluates to null or undefined and do a quick escape by returning false
  if (!obj1 || !obj2) {
    return false;
  }

  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}
