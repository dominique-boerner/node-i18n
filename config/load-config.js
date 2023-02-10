const fs = require("fs");

/**
 * Load the config.json for the project.
 *
 * @param {string} path  - the path of the configuration file
 * @return {JSON} - the configuration as json file
 */
module.exports = function loadConfig(path) {
  try {
    const file = fs.readFileSync(path);

    return JSON.parse(file);
  } catch (e) {
    throw new Error("error while loading config file.");
  }
};
