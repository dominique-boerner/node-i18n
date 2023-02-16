const fs = require("fs");
const configControllerInstance = require("./config.service");

/**
 * FileController
 */
class FileService {
  configController = configControllerInstance;

  getFiles() {
    const config = this.configController.getConfig();
    const fileNames = fs.readdirSync(config.i18nDir);
    const includedFilesRegExp = new RegExp(`${config.filePattern}`);

    return fileNames.filter((file) => {
      return includedFilesRegExp.test(file);
    });
  }
}

/**
 * export as singleton
 */
const fileServiceInstance = new FileService();
module.exports = fileServiceInstance;
