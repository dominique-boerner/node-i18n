const i18n = require("./i18n");
const path = require("path");
const fs = require("fs");
const configControllerInstance = require("./service/config.service");
const directoryServiceInstance = require("./service/directory.service");

/**
 * Starting point of the application.
 */
(function main() {
  const root = directoryServiceInstance.getAppRootDir();
  let configFile = configControllerInstance.getConfig();

  const i18nDir = `${root}/${configFile.i18nDir}`;
  const filePattern = configFile.filePattern;
  const files = i18n.getFiles(i18nDir, filePattern);

  if (files.length === 0) {
    console.info(
      "\x1b[31m%s",
      `ERROR: No file found, matching the pattern "${filePattern}".`
    );
    return;
  }
  console.info(
    "\x1b[34m%s",
    `INFO: ${files.length} translation files found in ${i18nDir}.`
  );

  const fileContent = i18n.parse(files.map((file) => `${i18nDir}/${file}`));

  console.info("\x1b[34m%s", "INFO: Files are being analysed, please wait...");
  i18n.diff(fileContent, files);
})();

function getAppRootDir() {
  let currentDir = __dirname;
  while (!fs.existsSync(path.join(currentDir, "package.json"))) {
    currentDir = path.join(currentDir, "..");
  }
  return currentDir;
}
