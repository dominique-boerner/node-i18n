/**
 * Returns the default configuration.
 *
 * @return {{filePattern: string, i18nDir: string}} - the configuration structure.
 */
module.exports = function getDefaultConfig() {
  return {
    i18nDir: "./assets/i18n",
    filePattern: ".json",
  };
};
