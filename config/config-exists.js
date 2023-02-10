const fs = require("fs");

/**
 * Checks, if the config file exists.
 *
 * @param {string} path - the path of the configuration file
 *
 * @return {boolean} - if the configuration file exists
 */
module.exports = function configExists(path) {
  return fs.existsSync(path);
};
