const fs = require("fs");

/**
 * Read all files and returns the content of the files
 * in an array.
 *
 * @param {string[]} files
 *
 * @return {string[]} content - the content of the files.
 */
module.exports = function parse(files) {
  return files.map((file) => {
    const fileContent = fs.readFileSync(file);
    return JSON.parse(fileContent);
  });
};
