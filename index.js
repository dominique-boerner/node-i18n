const config = require("./config");
const i18n = require("./i18n");

/**
 * Starting point of the application.
 */
(function main() {
  const CONFIG_PATH = "./i18n.config.json";

  let configFile = config.getDefaultConfig();
  if (config.configExists(CONFIG_PATH)) {
    console.info(`Configuration found.`);
    configFile = config.loadConfig(CONFIG_PATH);
  } else {
    console.info("Configuration file not found. Loading default config");
  }

  const i18nDir = configFile.i18nDir;
  const filePattern = configFile.filePattern;
  const files = i18n.detectI18nFiles(i18nDir, filePattern);

  if (files.length === 0) {
    console.info(`No file found, matching the pattern "${filePattern}".`);
  }
  console.info(
    `${files.length} files found in directory "${i18nDir}": `,
    files
  );

  const fileContent = i18n.readFiles(files.map((file) => `${i18nDir}/${file}`));
  console.log("Difference found", i18n.diff(fileContent));
  // console.log(i18n.diff(fileContent));
})();
