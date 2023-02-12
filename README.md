# node-i18n

This repository is a test for analyzing i18n files based on their keys:

![preview](./.github/assets/diff-console.png)

## Configuration

Create a i18n.config.json on the root of your project:

```
{
  // the directory in which the translation files are located
  "i18nDir": "./assets/i18n",
  // the files to search for, using regexp
  "filePattern": ".json"
}
```