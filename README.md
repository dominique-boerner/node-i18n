# node-i18n

[![Node.js CI](https://github.com/dominique-boerner/node-i18n/actions/workflows/node.js.yml/badge.svg)](https://github.com/dominique-boerner/node-i18n/actions/workflows/node.js.yml)

*This repository is a work-in-progress to improve i18n management issues and avoid errors. Therefore, it should not be used in projects yet.*

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

## Future plans

The basic idea is to build a small web interface that should simplify the creation of i18n files across multiple files.
