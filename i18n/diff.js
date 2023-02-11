const { flattenObject } = require("../util");

/**
 * The diff() function takes the content of n files, and returns the difference between
 * them.
 *
 * @param {string[]} fileContents - the content of the different files.
 * @param {string[]} i18nFiles - the i18n files.
 * @return {string[]} difference
 */
module.exports = function diff(fileContents, i18nFiles) {
  // TODO: WIP
  const flattenedObjectKeys = fileContents.map((content) => {
    return Object.keys(flattenObject(content));
  });

  let i18nWithTranslation = {};

  i18nFiles.forEach(
    (file, index) => (i18nWithTranslation[file] = flattenedObjectKeys[index])
  );

  return i18nWithTranslation;
};
