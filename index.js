const i18n = require("./i18n");
const i18nServiceInstance = require("./service/i18n.service");

/**
 * Starting point of the application.
 */
(function main() {
  const files = i18nServiceInstance.getFiles();
  const fileContent = i18nServiceInstance.getContentOfFiles(files);

  console.info("\x1b[34m%s", "INFO: Files are being analysed, please wait...");
  i18n.diff(fileContent, files);
})();
