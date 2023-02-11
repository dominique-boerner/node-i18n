/**
 * Flattens an object
 *
 * @see https://stackoverflow.com/questions/44134212/best-way-to-flatten-js-object-keys-and-values-to-a-single-depth-array
 *
 * @param {Object} object -the object to flatten
 * @return {object} - the flattened object
 */
module.exports = function flattenObject(object) {
  let toReturn = {};

  for (let i in object) {
    if (!object.hasOwnProperty(i)) continue;

    if (typeof object[i] === "object" && object[i] !== null) {
      let flatObject = flattenObject(object[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + "." + x] = flatObject[x];
      }
    } else {
      toReturn[i] = object[i];
    }
  }
  return toReturn;
};
