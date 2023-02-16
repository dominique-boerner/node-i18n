const fs = require("fs");
const configServiceInstance = require("./config.service");
const directoryServiceInstance = require("./directory.service");

/**
 * I18nService
 */
class I18nService {
  configService = configServiceInstance;
  directoryService = directoryServiceInstance;

  /**
   * Returns the names of every i18n file.
   *
   * @return {string[]} - the i18n files.
   */
  getFiles() {
    const config = this.configService.getConfig();
    const fileNames = fs.readdirSync(config.i18nDir);
    const includedFilesRegExp = new RegExp(`${config.filePattern}`);

    return fileNames.filter((file) => {
      return includedFilesRegExp.test(file);
    });
  }

  getContentOfFiles(files) {
    return files.map((file) => {
      const path = `${this.directoryService.getAppRootDir()}/${
        this.configService.getConfig().i18nDir
      }/${file}`;
      return this.getContentOfFile(path);
    });
  }

  getContentOfFile(file) {
    const fileContent = fs.readFileSync(file).toString();
    return JSON.parse(fileContent);
  }
}

/**
 * export as singleton
 */
const i18nServiceInstance = new I18nService();
module.exports = i18nServiceInstance;
