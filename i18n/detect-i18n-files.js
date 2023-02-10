const fs = require("fs");

/**
 * Detects the i18n files on a given location.
 *
 * @param {string} path - the directory which contains the i18n files.
 * @param {string} filePattern - a regexp to filter the i18n files (optional).
 *
 * @return {string[]} files - the i18n files.
 */
module.exports = function (path, filePattern = "*") {
  const fileNames = fs.readdirSync(path);

  return fileNames.filter((file) => {
    const regExp = new RegExp(`${filePattern}`);
    return regExp.test(file);
  });
};
