/**
 * This is a small utility package tailored to deep clone a simple object
 * It is not however a sophisticated as lodash cloneDeep method but addresses the library's problem
 * @param {aObject} aObject
 */
export default function cloneDeep(aObject) {
  if (!aObject) {
    return aObject;
  }

  let bObject = {};

  for (var key in aObject) {
    let _value = aObject[key];
    bObject[key] = typeof _value === "object" ? cloneDeep(_value) : _value;
  }

  return bObject;
}
