const fs = require("fs");
const path = require("path");

/**
 * DirectoryService
 *
 * This service handles the access to the directory.
 */
class DirectoryService {
  /**
   * Get the root directory of the app, useful for using this as npm package.
   *
   * @return {string} - the directory path
   */
  getAppRootDir() {
    let currentDir = __dirname;
    while (!fs.existsSync(path.join(currentDir, "package.json"))) {
      currentDir = path.join(currentDir, "..");
    }
    return currentDir;
  }
}

/**
 * export as singleton
 */
const directoryServiceInstance = new DirectoryService();
module.exports = directoryServiceInstance;
