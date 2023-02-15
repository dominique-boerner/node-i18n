const { flattenObject } = require("../util");

/**
 * The diff() function takes the content of n files, and returns the difference between
 * them.
 *
 * @param {string[]} fileContents - the content of the different files.
 * @param {string[]} i18nFiles - the i18n files.
 * @return {string[]} difference
 */
module.exports = function diff(fileContents, i18nFiles) {
  let languages = new Set();
  const flattenedObjectKeys = fileContents.map((content) => {
    return Object.keys(flattenObject(content));
  });

  i18nFiles.forEach((i18n, index) => {
    languages.add({
      language: i18n,
      data: flattenedObjectKeys[index],
    });
  });

  const buffers = [...languages].map((content) =>
    Buffer.from(JSON.stringify(content.data))
  );

  let compared = new Set();
  buffers.forEach((buffer, index) => {
    const buffersCopy = [...buffers];
    delete buffersCopy[index];

    buffersCopy.forEach((bufferCopy, index2) => {
      if (buffer.compare(bufferCopy) > 0) {
        console.log(
          "\x1b[31m%s- \x1b[31m%s \x1b[32m%s+",
          `ERROR: ${i18nFiles[index]} => ${i18nFiles[index2]}:\n`,
          `${buffer.toString()} in ${i18nFiles[index]}`,
          "\n",
          `${bufferCopy.toString()} in ${i18nFiles[index2]}`
        );
        compared.add(buffer);
      }
    });
  });

  if (compared.size === 0) {
    console.log("\x1b[32m%s", "SUCCESS: Language files contain the same keys.");
  }
};
