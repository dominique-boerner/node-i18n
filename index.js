const config = require("./config");
const i18n = require("./i18n");

/**
 * Starting point of the application.
 */
(function main() {
  const CONFIG_PATH = `${__dirname}/i18n.config.json`;

  let configFile = config.getDefaultConfig();
  if (config.configExists(CONFIG_PATH)) {
    console.info(
      "\x1b[34m%s",
      "INFO: Configuration file was found. Configuration file is used for analysis."
    );
    configFile = config.parse(CONFIG_PATH);
  } else {
    console.info(
      "\x1b[34m%s",
      "INFO: Configuration file not found. Loading default config"
    );
  }

  const i18nDir = `${__dirname}/${configFile.i18nDir}`;
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
  // console.log(i18n.diff(fileContent));
})();
