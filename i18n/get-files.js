const fs = require("fs");

/**
 * Get i18n files on a given location and a given filePattern.
 *
 * @param {string} path - the directory which contains the i18n files.
 * @param {string} filePattern - a regexp to filter the i18n files (optional).
 *
 * @return {string[]} files - the i18n files.
 */
module.exports = function getFiles(path, filePattern = "") {
  const fileNames = fs.readdirSync(path);
  const includedFilesRegExp = new RegExp(`${filePattern}`);

  return fileNames.filter((file) => {
    return includedFilesRegExp.test(file);
  });
};
