# Magento 2 - Blank theme - SASS version

SASS based version of Magento 2 Blank theme, which aims to be as close to the core code as possible.

This is a fork of https://github.com/SnowdogApps/magento2-theme-blank-sass, which seems to not be as active and contains few bugs.

## Changelog

**2.0 - First forked version**

* Remove lib-css mixin and usage of it. Mixin was puting property only if value is not false. By default SASS doesn't include properties with `null` value. Therefore it required to change some variables from `false` to `null`
* Fix incorect divisions, which were resulting in incorectly generated CSS

## Installation
Not packaged yet

## Compatibility
* Magento 2.2: v2.0.0 or later

## Bug reports and contribution rules
- Before reporting an issue, check if you can reproduce it on the clean Magento instance with LESS version of the Blank theme. If that's true, submit issue to the Magento 2 repository, not here
- If you know how to fix an issue, which is reproducible in Magento core, submit PR to the core product first, then here, with a link to PR in Magento 2 repository
- If issue is related only to the SASS port, feel free to submit issue or PR
