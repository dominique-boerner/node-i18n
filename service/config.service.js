const fs = require("fs");
const directoryServiceInstance = require("./directory.service");

/**
 * ConfigController
 */
class ConfigService {
  directoryService = directoryServiceInstance;

  CONFIG_PATH = `${this.directoryService.getAppRootDir()}/i18n.config.json`;

  configFile = this._getDefaultConfig();

  configExists() {
    return fs.existsSync(this.CONFIG_PATH);
  }

  getConfig() {
    if (this.configExists()) {
      console.info(
        "\x1b[34m%s",
        "INFO: Configuration file was found. Configuration file is used for analysis."
      );
      this.configFile = this.parse();
    } else {
      console.info(
        "\x1b[34m%s",
        "INFO: Configuration file not found. Loading default config"
      );
    }

    return this.configFile;
  }

  parse() {
    try {
      const file = fs.readFileSync(this.CONFIG_PATH);

      return JSON.parse(file);
    } catch (e) {
      throw new Error("error while loading config file.");
    }
  }

  _getDefaultConfig() {
    return {
      i18nDir: "./assets/i18n",
      filePattern: ".json",
    };
  }
}

/**
 * export as singleton
 */
const configServiceInstance = new ConfigService();
module.exports = configServiceInstance;
