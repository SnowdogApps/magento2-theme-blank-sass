[![Build Status](https://travis-ci.org/SnowdogApps/magento2-theme-blank-sass.svg?branch=master)](https://travis-ci.org/SnowdogApps/magento2-theme-blank-sass)
# Magento 2 - Blank theme - SASS version

## Current status
Theme is **ready to use** as Composer package with Magento 2.
Still a lot of things needs to be fixed or polished, but definietly it's working :smile:

## Instalation
<<<<<<< HEAD
=======
* Add new VCS repository and package name and version to `composer.json`
```json
  "theme-blank-sass": {
    "type": "vcs",
    "url": "git@github.com:SnowdogApps/magento2-theme-blank-sass.git"
  }
  [...]
  "require": {
    "snowdog/theme-blank-sass": "^0.2.1"
  }
```
>>>>>>> 0.4.0
* `composer require snowdog/theme-blank-sass`
* If you are not in developer mode you should run `bin/magento setup:static-content:deploy`
* Compile SASS files, i.e. via [Frontools](https://github.com/SnowdogApps/magento2-frontools)
* Check your great looking theme :wink:
