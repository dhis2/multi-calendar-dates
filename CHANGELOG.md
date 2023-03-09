## [1.0.2](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.1...v1.0.2) (2023-03-09)


### Bug Fixes

* use custom locale when it exists ([#23](https://github.com/dhis2/multi-calendar-dates/issues/23)) ([3cfb58a](https://github.com/dhis2/multi-calendar-dates/commit/3cfb58a436f1c3e4c58a5599b14097c50590c9c3))

## [1.0.1](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0...v1.0.1) (2023-03-09)


### Bug Fixes

* parse date correctly when a dhis2 calendar type is passed ([#22](https://github.com/dhis2/multi-calendar-dates/issues/22)) ([08c8032](https://github.com/dhis2/multi-calendar-dates/commit/08c8032e5dc32ad9f6f2810ecd7b9cb594766d36))

# 1.0.0 (2023-02-23)


### Bug Fixes

* add eraYear to nepali calendar ([c725d96](https://github.com/dhis2/multi-calendar-dates/commit/c725d96b0613c58567e1193e542d5f5eff58041c))
* change build process to emit cjs and es modules ([#10](https://github.com/dhis2/multi-calendar-dates/issues/10)) ([1102de8](https://github.com/dhis2/multi-calendar-dates/commit/1102de87fd99006e1d1e1bad29af3790f7b3bdc2))
* change english-nepal code to en-NP (not ne-EN) ([7e92aa4](https://github.com/dhis2/multi-calendar-dates/commit/7e92aa4efe7302aca3ad52ebd98d49a52141c15b))
* change getNowInCalendar to default to user timezone rather than utc ([03caf6d](https://github.com/dhis2/multi-calendar-dates/commit/03caf6d4a8c0b83924cf47e0aacecb7987168d80))
* change param for useDatePicker from initialDate to date ([429b2eb](https://github.com/dhis2/multi-calendar-dates/commit/429b2ebb660dfbaf77de9f1748dfa7e7fc0472ea))
* change react dependency to fix issue with docusaurus build ([c58d560](https://github.com/dhis2/multi-calendar-dates/commit/c58d5603f1d30667bcdf241c8a3b02cd06fffdb9))
* change react to be a peer dependency ([fbf106c](https://github.com/dhis2/multi-calendar-dates/commit/fbf106cab1ed0dad52d0877c2b61fb3bd6c2540d))
* change the api for nepali calendar to accept a string ([3a51a6f](https://github.com/dhis2/multi-calendar-dates/commit/3a51a6f6b8a48649c0588b0f7421529c3ce64eb0))
* change useWeekDayLabels to accept a custom format for day names ([0369006](https://github.com/dhis2/multi-calendar-dates/commit/036900694aad88ed88f9b8242c537f9e01847b40))
* default to user timezone or UTC if no timezone passed ([e9c34e1](https://github.com/dhis2/multi-calendar-dates/commit/e9c34e14e0c3f6a7ab59ba7ecdf74959ddf0cc95))
* ensure ethiopic dates are in the correct era ([34061d9](https://github.com/dhis2/multi-calendar-dates/commit/34061d9c7d54f8343ede4f65c723b7ce03c57ef8))
* ensure that direction is either rtl or ltr ([4a92e91](https://github.com/dhis2/multi-calendar-dates/commit/4a92e91b979c4791613f50ca88c1a4d72a45e9c3))
* fallback to default locale if passed a wrong locale ([785a1b9](https://github.com/dhis2/multi-calendar-dates/commit/785a1b94c134b0ff42613b71d673505816186cbd))
* fix period generation for Nepali ([157e6a7](https://github.com/dhis2/multi-calendar-dates/commit/157e6a7812ab7480f190413c60a66f4bb86f68c0))
* force a publish ([feec6c2](https://github.com/dhis2/multi-calendar-dates/commit/feec6c28fd7b49febaa6a8ed98a6fe92979a6704))
* force a unpublish for alpha channel ([c4bcb20](https://github.com/dhis2/multi-calendar-dates/commit/c4bcb20d03150909ea12d4ba596b3b0d0c390162))
* force npm publish ([571584c](https://github.com/dhis2/multi-calendar-dates/commit/571584c93e1a6fa9e8b0a02ad12cc8037e0f7c65))
* force npm publish ([f57733e](https://github.com/dhis2/multi-calendar-dates/commit/f57733eee2ba3c1421f3cab7bf4d179fffa4997f))
* force npm publish ([bacacf2](https://github.com/dhis2/multi-calendar-dates/commit/bacacf26327e1b36f0fed21859b67e7d87cfe7da))
* force npm publish ([ac2ab35](https://github.com/dhis2/multi-calendar-dates/commit/ac2ab35d7e976e82aa5f780e8b769b6e6e654e1a))
* force npm publish ([8021a97](https://github.com/dhis2/multi-calendar-dates/commit/8021a9739e85ee6bfc78c100acde66c5b78a7181))
* force npm publish ([d22e470](https://github.com/dhis2/multi-calendar-dates/commit/d22e4700511505fd699b0f1d1814064f885af8b5))
* force npm publish ([e5cb2ff](https://github.com/dhis2/multi-calendar-dates/commit/e5cb2ff91b9f72dd842af044aff64b8f5351554a))
* force npm publish ([39bd827](https://github.com/dhis2/multi-calendar-dates/commit/39bd827b7ff6a65cfb7e831b55dc8ded2716d509))
* force npm publish ([6f95463](https://github.com/dhis2/multi-calendar-dates/commit/6f95463988925465e09e90538b18f04ad1d09daf))
* force npm publish ([6b7fbf3](https://github.com/dhis2/multi-calendar-dates/commit/6b7fbf3227e1254b7fe651c49d118a258470a9f4))
* force npm publish ([2ce77b3](https://github.com/dhis2/multi-calendar-dates/commit/2ce77b3e920788b955dc243570e9b4816a3200db))
* force npm publish ([3e43ce4](https://github.com/dhis2/multi-calendar-dates/commit/3e43ce4592bd907ee0936ee81bc02949010ae50e))
* force publish to @dhis2/multi-calendar-dates ([0bc26f1](https://github.com/dhis2/multi-calendar-dates/commit/0bc26f15f8165febc3e60883bc1e6bde7fb0226b))
* handle on-the-fly changes to selected calendar ([89f0427](https://github.com/dhis2/multi-calendar-dates/commit/89f04278aba25b131cbf57fe21809abd1a3fec9e))
* make nepali calendar default to en-NP if no valid locale provided ([a074789](https://github.com/dhis2/multi-calendar-dates/commit/a074789125840bb349f581a4a70e0cf2b6dc928f))
* make sure period calculation works with non-standard dhis2 calendar IDs ([7c56b1a](https://github.com/dhis2/multi-calendar-dates/commit/7c56b1a219e95dce7b781a3642e5b486d028ab7c))
* put pack semantic-release config ([4ae3f4c](https://github.com/dhis2/multi-calendar-dates/commit/4ae3f4cf848a7c736b12809a2bc4cb1f41f8ad11))
* remove .only for tests ([72fa7e5](https://github.com/dhis2/multi-calendar-dates/commit/72fa7e5c34cf0ec4e9a2f2ccfd7e705c480d1257))
* remove .only from test ([c685e34](https://github.com/dhis2/multi-calendar-dates/commit/c685e3496ffc8a46155d8564327570ddfd1efc7d))
* remove test unpublish alpha ([f815e31](https://github.com/dhis2/multi-calendar-dates/commit/f815e310538e22133c88fb20aea3928bc83de3ab))
* respect startingDay for weekly period generation ([5f1196a](https://github.com/dhis2/multi-calendar-dates/commit/5f1196aff2bad6b77bdaa5fdd52b38bf720eea0b))
* test npm publish ([40de24f](https://github.com/dhis2/multi-calendar-dates/commit/40de24f05a0e3d8277c0d3f39e7295d0dbf11f23))
* test npm publish ([69eb402](https://github.com/dhis2/multi-calendar-dates/commit/69eb4026e06340c2a7e6f34e77da9e8e5a7887d4))
* throw error if non-supported locale is passed for a custom calendar ([293db88](https://github.com/dhis2/multi-calendar-dates/commit/293db88269a079d4b3977859d5f7c62a661fa0f7))
* update current day selection logic to use same calendar system ([adb0dc8](https://github.com/dhis2/multi-calendar-dates/commit/adb0dc8541cd995192441339e7c36ccf49977a07))
* update label for financial year periods ([c13a829](https://github.com/dhis2/multi-calendar-dates/commit/c13a829c8e6f11313f6ab3a6e8ec89e31d902efd))
* update labels for Financial Year period types ([f6c9b68](https://github.com/dhis2/multi-calendar-dates/commit/f6c9b68d2a15cfc1b6a2322b98524324cb319329))
* update localisation logic for fixed period generation ([668f6d8](https://github.com/dhis2/multi-calendar-dates/commit/668f6d8a3e881926a192c6065aa82cea473150e1))
* update useDatePicker hook to resolve options with hook ([ffa509a](https://github.com/dhis2/multi-calendar-dates/commit/ffa509ac462d0be44ca58cb2958592d26b19c416))
* update useDatePicker to accept the calendar date rather than the iso one ([a65fc3d](https://github.com/dhis2/multi-calendar-dates/commit/a65fc3db33321c737c873bb5ef972f1e4a698da3))
* update weekly period logic to match analytics tests ([2faf567](https://github.com/dhis2/multi-calendar-dates/commit/2faf567adcb5705d35f4d3d5930fb03aa7b343ef))
* use numberinSystem if provided ([b3e82fb](https://github.com/dhis2/multi-calendar-dates/commit/b3e82fba160839beeafdc78f77f601d05e48f345))


### Features

* expose a method to return today date in specific calendar ([1213b45](https://github.com/dhis2/multi-calendar-dates/commit/1213b453a71f4eef5393cd72f2204e7deea2b998))
* implement first iteration of the engine ([51526db](https://github.com/dhis2/multi-calendar-dates/commit/51526dbc08342c3ccaf59871f251af37aaf0b290))
* implement nepali calendar ([bcb66c6](https://github.com/dhis2/multi-calendar-dates/commit/bcb66c6b38db7ebab720c737d658ac0a0d67dcf5))
* implement nepali calendar from gregorian conversion ([4ee9173](https://github.com/dhis2/multi-calendar-dates/commit/4ee91733d6405b2ba53e8304c2dbabafff52e4a1))
* implement period calculation special cases for ethiopic calendar ([62b3de3](https://github.com/dhis2/multi-calendar-dates/commit/62b3de325450ab86d271b825d58ab2c83f18818c))
* implement rest of period calculations for gregrorian calendar ([9f83099](https://github.com/dhis2/multi-calendar-dates/commit/9f83099a4ad5361d6458be4606cfae8110ba44e1))
* implement some fixed period calculations for gregrorian calendar ([040bd8e](https://github.com/dhis2/multi-calendar-dates/commit/040bd8ed1afe9f9594513bace74b2ab23d35a80f))
* update period generation to add start and end date ([9adb0aa](https://github.com/dhis2/multi-calendar-dates/commit/9adb0aa8a5d14dc7d89a02382e391823638cde24))

# [1.0.0-beta.24](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.23...v1.0.0-beta.24) (2023-02-22)


### Bug Fixes

* update localisation logic for fixed period generation ([668f6d8](https://github.com/dhis2/multi-calendar-dates/commit/668f6d8a3e881926a192c6065aa82cea473150e1))

# [1.0.0-beta.23](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.22...v1.0.0-beta.23) (2023-02-17)


### Bug Fixes

* update useDatePicker hook to resolve options with hook ([ffa509a](https://github.com/dhis2/multi-calendar-dates/commit/ffa509ac462d0be44ca58cb2958592d26b19c416))

# [1.0.0-beta.22](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.21...v1.0.0-beta.22) (2023-02-15)


### Bug Fixes

* change build process to emit cjs and es modules ([#10](https://github.com/dhis2/multi-calendar-dates/issues/10)) ([1102de8](https://github.com/dhis2/multi-calendar-dates/commit/1102de87fd99006e1d1e1bad29af3790f7b3bdc2))
* ensure ethiopic dates are in the correct era ([34061d9](https://github.com/dhis2/multi-calendar-dates/commit/34061d9c7d54f8343ede4f65c723b7ce03c57ef8))
* handle on-the-fly changes to selected calendar ([89f0427](https://github.com/dhis2/multi-calendar-dates/commit/89f04278aba25b131cbf57fe21809abd1a3fec9e))
* update useDatePicker to accept the calendar date rather than the iso one ([a65fc3d](https://github.com/dhis2/multi-calendar-dates/commit/a65fc3db33321c737c873bb5ef972f1e4a698da3))

# [1.0.0-alpha.18](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.17...v1.0.0-alpha.18) (2023-02-14)


### Bug Fixes

* change build process to emit cjs and es modules ([#10](https://github.com/dhis2/multi-calendar-dates/issues/10)) ([1102de8](https://github.com/dhis2/multi-calendar-dates/commit/1102de87fd99006e1d1e1bad29af3790f7b3bdc2))

# [1.0.0-alpha.17](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.16...v1.0.0-alpha.17) (2023-01-30)


### Bug Fixes

* ensure ethiopic dates are in the correct era ([34061d9](https://github.com/dhis2/multi-calendar-dates/commit/34061d9c7d54f8343ede4f65c723b7ce03c57ef8))

# [1.0.0-alpha.16](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.15...v1.0.0-alpha.16) (2023-01-24)


### Bug Fixes

* handle on-the-fly changes to selected calendar ([89f0427](https://github.com/dhis2/multi-calendar-dates/commit/89f04278aba25b131cbf57fe21809abd1a3fec9e))

# [1.0.0-alpha.15](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.14...v1.0.0-alpha.15) (2023-01-11)


### Bug Fixes

* update useDatePicker to accept the calendar date rather than the iso one ([a65fc3d](https://github.com/dhis2/multi-calendar-dates/commit/a65fc3db33321c737c873bb5ef972f1e4a698da3))

# [1.0.0-beta.21](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.20...v1.0.0-beta.21) (2023-01-10)


### Bug Fixes

* add eraYear to nepali calendar ([c725d96](https://github.com/dhis2/multi-calendar-dates/commit/c725d96b0613c58567e1193e542d5f5eff58041c))
* change getNowInCalendar to default to user timezone rather than utc ([03caf6d](https://github.com/dhis2/multi-calendar-dates/commit/03caf6d4a8c0b83924cf47e0aacecb7987168d80))
* fix period generation for Nepali ([157e6a7](https://github.com/dhis2/multi-calendar-dates/commit/157e6a7812ab7480f190413c60a66f4bb86f68c0))
* force a unpublish for alpha channel ([c4bcb20](https://github.com/dhis2/multi-calendar-dates/commit/c4bcb20d03150909ea12d4ba596b3b0d0c390162))
* force npm publish ([571584c](https://github.com/dhis2/multi-calendar-dates/commit/571584c93e1a6fa9e8b0a02ad12cc8037e0f7c65))
* force npm publish ([f57733e](https://github.com/dhis2/multi-calendar-dates/commit/f57733eee2ba3c1421f3cab7bf4d179fffa4997f))
* force npm publish ([bacacf2](https://github.com/dhis2/multi-calendar-dates/commit/bacacf26327e1b36f0fed21859b67e7d87cfe7da))
* force npm publish ([ac2ab35](https://github.com/dhis2/multi-calendar-dates/commit/ac2ab35d7e976e82aa5f780e8b769b6e6e654e1a))
* force npm publish ([8021a97](https://github.com/dhis2/multi-calendar-dates/commit/8021a9739e85ee6bfc78c100acde66c5b78a7181))
* force npm publish ([d22e470](https://github.com/dhis2/multi-calendar-dates/commit/d22e4700511505fd699b0f1d1814064f885af8b5))
* force publish to @dhis2/multi-calendar-dates ([0bc26f1](https://github.com/dhis2/multi-calendar-dates/commit/0bc26f15f8165febc3e60883bc1e6bde7fb0226b))
* make nepali calendar default to en-NP if no valid locale provided ([a074789](https://github.com/dhis2/multi-calendar-dates/commit/a074789125840bb349f581a4a70e0cf2b6dc928f))
* make sure period calculation works with non-standard dhis2 calendar IDs ([7c56b1a](https://github.com/dhis2/multi-calendar-dates/commit/7c56b1a219e95dce7b781a3642e5b486d028ab7c))
* remove test unpublish alpha ([f815e31](https://github.com/dhis2/multi-calendar-dates/commit/f815e310538e22133c88fb20aea3928bc83de3ab))
* respect startingDay for weekly period generation ([5f1196a](https://github.com/dhis2/multi-calendar-dates/commit/5f1196aff2bad6b77bdaa5fdd52b38bf720eea0b))
* update label for financial year periods ([c13a829](https://github.com/dhis2/multi-calendar-dates/commit/c13a829c8e6f11313f6ab3a6e8ec89e31d902efd))
* update labels for Financial Year period types ([f6c9b68](https://github.com/dhis2/multi-calendar-dates/commit/f6c9b68d2a15cfc1b6a2322b98524324cb319329))
* update weekly period logic to match analytics tests ([2faf567](https://github.com/dhis2/multi-calendar-dates/commit/2faf567adcb5705d35f4d3d5930fb03aa7b343ef))


### Features

* expose a method to return today date in specific calendar ([1213b45](https://github.com/dhis2/multi-calendar-dates/commit/1213b453a71f4eef5393cd72f2204e7deea2b998))
* implement period calculation special cases for ethiopic calendar ([62b3de3](https://github.com/dhis2/multi-calendar-dates/commit/62b3de325450ab86d271b825d58ab2c83f18818c))
* implement rest of period calculations for gregrorian calendar ([9f83099](https://github.com/dhis2/multi-calendar-dates/commit/9f83099a4ad5361d6458be4606cfae8110ba44e1))
* implement some fixed period calculations for gregrorian calendar ([040bd8e](https://github.com/dhis2/multi-calendar-dates/commit/040bd8ed1afe9f9594513bace74b2ab23d35a80f))
* update period generation to add start and end date ([9adb0aa](https://github.com/dhis2/multi-calendar-dates/commit/9adb0aa8a5d14dc7d89a02382e391823638cde24))

# [1.0.0-alpha.14](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.13...v1.0.0-alpha.14) (2023-01-10)


### Bug Fixes

* change getNowInCalendar to default to user timezone rather than utc ([03caf6d](https://github.com/dhis2/multi-calendar-dates/commit/03caf6d4a8c0b83924cf47e0aacecb7987168d80))

# [1.0.0-alpha.13](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.12...v1.0.0-alpha.13) (2023-01-09)


### Bug Fixes

* force npm publish ([571584c](https://github.com/dhis2/multi-calendar-dates/commit/571584c93e1a6fa9e8b0a02ad12cc8037e0f7c65))
* force publish to @dhis2/multi-calendar-dates ([0bc26f1](https://github.com/dhis2/multi-calendar-dates/commit/0bc26f15f8165febc3e60883bc1e6bde7fb0226b))

# [1.0.0-alpha.13](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.12...v1.0.0-alpha.13) (2023-01-09)


### Bug Fixes

* force publish to @dhis2/multi-calendar-dates ([0bc26f1](https://github.com/dhis2/multi-calendar-dates/commit/0bc26f15f8165febc3e60883bc1e6bde7fb0226b))

# [1.0.0-alpha.12](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.11...v1.0.0-alpha.12) (2023-01-02)


### Bug Fixes

* update weekly period logic to match analytics tests ([2faf567](https://github.com/dhis2/multi-calendar-dates/commit/2faf567adcb5705d35f4d3d5930fb03aa7b343ef))


### Features

* update period generation to add start and end date ([9adb0aa](https://github.com/dhis2/multi-calendar-dates/commit/9adb0aa8a5d14dc7d89a02382e391823638cde24))

# [1.0.0-alpha.11](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.10...v1.0.0-alpha.11) (2022-12-29)


### Bug Fixes

* update label for financial year periods ([c13a829](https://github.com/dhis2/multi-calendar-dates/commit/c13a829c8e6f11313f6ab3a6e8ec89e31d902efd))

# [1.0.0-alpha.10](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2022-12-28)


### Bug Fixes

* update labels for Financial Year period types ([f6c9b68](https://github.com/dhis2/multi-calendar-dates/commit/f6c9b68d2a15cfc1b6a2322b98524324cb319329))

# [1.0.0-alpha.9](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2022-12-28)


### Bug Fixes

* respect startingDay for weekly period generation ([5f1196a](https://github.com/dhis2/multi-calendar-dates/commit/5f1196aff2bad6b77bdaa5fdd52b38bf720eea0b))

# [1.0.0-alpha.8](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2022-12-28)


### Bug Fixes

* make sure period calculation works with non-standard dhis2 calendar IDs ([7c56b1a](https://github.com/dhis2/multi-calendar-dates/commit/7c56b1a219e95dce7b781a3642e5b486d028ab7c))

# [1.0.0-alpha.7](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.6...v1.0.0-alpha.7) (2022-12-28)


### Bug Fixes

* add eraYear to nepali calendar ([c725d96](https://github.com/dhis2/multi-calendar-dates/commit/c725d96b0613c58567e1193e542d5f5eff58041c))

# [1.0.0-alpha.6](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2022-12-28)


### Bug Fixes

* force npm publish ([f57733e](https://github.com/dhis2/multi-calendar-dates/commit/f57733eee2ba3c1421f3cab7bf4d179fffa4997f))

# [1.0.0-alpha.5](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2022-12-28)


### Features

* expose a method to return today date in specific calendar ([1213b45](https://github.com/dhis2/multi-calendar-dates/commit/1213b453a71f4eef5393cd72f2204e7deea2b998))

# [1.0.0-alpha.4](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2022-12-27)


### Bug Fixes

* force npm publish ([bacacf2](https://github.com/dhis2/multi-calendar-dates/commit/bacacf26327e1b36f0fed21859b67e7d87cfe7da))

# [1.0.0-alpha.3](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2022-12-27)


### Bug Fixes

* make nepali calendar default to en-NP if no valid locale provided ([a074789](https://github.com/dhis2/multi-calendar-dates/commit/a074789125840bb349f581a4a70e0cf2b6dc928f))

# [1.0.0-alpha.2](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2022-12-27)


### Bug Fixes

* force npm publish ([ac2ab35](https://github.com/dhis2/multi-calendar-dates/commit/ac2ab35d7e976e82aa5f780e8b769b6e6e654e1a))

# 1.0.0-alpha.1 (2022-12-27)


### Bug Fixes

* change english-nepal code to en-NP (not ne-EN) ([7e92aa4](https://github.com/dhis2/multi-calendar-dates/commit/7e92aa4efe7302aca3ad52ebd98d49a52141c15b))
* change param for useDatePicker from initialDate to date ([429b2eb](https://github.com/dhis2/multi-calendar-dates/commit/429b2ebb660dfbaf77de9f1748dfa7e7fc0472ea))
* change react dependency to fix issue with docusaurus build ([c58d560](https://github.com/dhis2/multi-calendar-dates/commit/c58d5603f1d30667bcdf241c8a3b02cd06fffdb9))
* change react to be a peer dependency ([fbf106c](https://github.com/dhis2/multi-calendar-dates/commit/fbf106cab1ed0dad52d0877c2b61fb3bd6c2540d))
* change the api for nepali calendar to accept a string ([3a51a6f](https://github.com/dhis2/multi-calendar-dates/commit/3a51a6f6b8a48649c0588b0f7421529c3ce64eb0))
* change useWeekDayLabels to accept a custom format for day names ([0369006](https://github.com/dhis2/multi-calendar-dates/commit/036900694aad88ed88f9b8242c537f9e01847b40))
* default to user timezone or UTC if no timezone passed ([e9c34e1](https://github.com/dhis2/multi-calendar-dates/commit/e9c34e14e0c3f6a7ab59ba7ecdf74959ddf0cc95))
* ensure that direction is either rtl or ltr ([4a92e91](https://github.com/dhis2/multi-calendar-dates/commit/4a92e91b979c4791613f50ca88c1a4d72a45e9c3))
* fallback to default locale if passed a wrong locale ([785a1b9](https://github.com/dhis2/multi-calendar-dates/commit/785a1b94c134b0ff42613b71d673505816186cbd))
* fix period generation for Nepali ([157e6a7](https://github.com/dhis2/multi-calendar-dates/commit/157e6a7812ab7480f190413c60a66f4bb86f68c0))
* force a publish ([feec6c2](https://github.com/dhis2/multi-calendar-dates/commit/feec6c28fd7b49febaa6a8ed98a6fe92979a6704))
* force a unpublish for alpha channel ([c4bcb20](https://github.com/dhis2/multi-calendar-dates/commit/c4bcb20d03150909ea12d4ba596b3b0d0c390162))
* force npm publish ([8021a97](https://github.com/dhis2/multi-calendar-dates/commit/8021a9739e85ee6bfc78c100acde66c5b78a7181))
* force npm publish ([d22e470](https://github.com/dhis2/multi-calendar-dates/commit/d22e4700511505fd699b0f1d1814064f885af8b5))
* force npm publish ([e5cb2ff](https://github.com/dhis2/multi-calendar-dates/commit/e5cb2ff91b9f72dd842af044aff64b8f5351554a))
* force npm publish ([39bd827](https://github.com/dhis2/multi-calendar-dates/commit/39bd827b7ff6a65cfb7e831b55dc8ded2716d509))
* force npm publish ([6f95463](https://github.com/dhis2/multi-calendar-dates/commit/6f95463988925465e09e90538b18f04ad1d09daf))
* force npm publish ([6b7fbf3](https://github.com/dhis2/multi-calendar-dates/commit/6b7fbf3227e1254b7fe651c49d118a258470a9f4))
* force npm publish ([2ce77b3](https://github.com/dhis2/multi-calendar-dates/commit/2ce77b3e920788b955dc243570e9b4816a3200db))
* force npm publish ([3e43ce4](https://github.com/dhis2/multi-calendar-dates/commit/3e43ce4592bd907ee0936ee81bc02949010ae50e))
* put pack semantic-release config ([4ae3f4c](https://github.com/dhis2/multi-calendar-dates/commit/4ae3f4cf848a7c736b12809a2bc4cb1f41f8ad11))
* remove .only for tests ([72fa7e5](https://github.com/dhis2/multi-calendar-dates/commit/72fa7e5c34cf0ec4e9a2f2ccfd7e705c480d1257))
* remove .only from test ([c685e34](https://github.com/dhis2/multi-calendar-dates/commit/c685e3496ffc8a46155d8564327570ddfd1efc7d))
* remove test unpublish alpha ([f815e31](https://github.com/dhis2/multi-calendar-dates/commit/f815e310538e22133c88fb20aea3928bc83de3ab))
* test npm publish ([40de24f](https://github.com/dhis2/multi-calendar-dates/commit/40de24f05a0e3d8277c0d3f39e7295d0dbf11f23))
* test npm publish ([69eb402](https://github.com/dhis2/multi-calendar-dates/commit/69eb4026e06340c2a7e6f34e77da9e8e5a7887d4))
* throw error if non-supported locale is passed for a custom calendar ([293db88](https://github.com/dhis2/multi-calendar-dates/commit/293db88269a079d4b3977859d5f7c62a661fa0f7))
* update current day selection logic to use same calendar system ([adb0dc8](https://github.com/dhis2/multi-calendar-dates/commit/adb0dc8541cd995192441339e7c36ccf49977a07))
* use numberinSystem if provided ([b3e82fb](https://github.com/dhis2/multi-calendar-dates/commit/b3e82fba160839beeafdc78f77f601d05e48f345))


### Features

* implement first iteration of the engine ([51526db](https://github.com/dhis2/multi-calendar-dates/commit/51526dbc08342c3ccaf59871f251af37aaf0b290))
* implement nepali calendar ([bcb66c6](https://github.com/dhis2/multi-calendar-dates/commit/bcb66c6b38db7ebab720c737d658ac0a0d67dcf5))
* implement nepali calendar from gregorian conversion ([4ee9173](https://github.com/dhis2/multi-calendar-dates/commit/4ee91733d6405b2ba53e8304c2dbabafff52e4a1))
* implement period calculation special cases for ethiopic calendar ([62b3de3](https://github.com/dhis2/multi-calendar-dates/commit/62b3de325450ab86d271b825d58ab2c83f18818c))
* implement rest of period calculations for gregrorian calendar ([9f83099](https://github.com/dhis2/multi-calendar-dates/commit/9f83099a4ad5361d6458be4606cfae8110ba44e1))
* implement some fixed period calculations for gregrorian calendar ([040bd8e](https://github.com/dhis2/multi-calendar-dates/commit/040bd8ed1afe9f9594513bace74b2ab23d35a80f))

# 1.0.0-alpha.1 (2022-12-27)


### Bug Fixes

* change english-nepal code to en-NP (not ne-EN) ([7e92aa4](https://github.com/dhis2/multi-calendar-dates/commit/7e92aa4efe7302aca3ad52ebd98d49a52141c15b))
* change param for useDatePicker from initialDate to date ([429b2eb](https://github.com/dhis2/multi-calendar-dates/commit/429b2ebb660dfbaf77de9f1748dfa7e7fc0472ea))
* change react dependency to fix issue with docusaurus build ([c58d560](https://github.com/dhis2/multi-calendar-dates/commit/c58d5603f1d30667bcdf241c8a3b02cd06fffdb9))
* change react to be a peer dependency ([fbf106c](https://github.com/dhis2/multi-calendar-dates/commit/fbf106cab1ed0dad52d0877c2b61fb3bd6c2540d))
* change the api for nepali calendar to accept a string ([3a51a6f](https://github.com/dhis2/multi-calendar-dates/commit/3a51a6f6b8a48649c0588b0f7421529c3ce64eb0))
* change useWeekDayLabels to accept a custom format for day names ([0369006](https://github.com/dhis2/multi-calendar-dates/commit/036900694aad88ed88f9b8242c537f9e01847b40))
* default to user timezone or UTC if no timezone passed ([e9c34e1](https://github.com/dhis2/multi-calendar-dates/commit/e9c34e14e0c3f6a7ab59ba7ecdf74959ddf0cc95))
* ensure that direction is either rtl or ltr ([4a92e91](https://github.com/dhis2/multi-calendar-dates/commit/4a92e91b979c4791613f50ca88c1a4d72a45e9c3))
* fallback to default locale if passed a wrong locale ([785a1b9](https://github.com/dhis2/multi-calendar-dates/commit/785a1b94c134b0ff42613b71d673505816186cbd))
* fix period generation for Nepali ([157e6a7](https://github.com/dhis2/multi-calendar-dates/commit/157e6a7812ab7480f190413c60a66f4bb86f68c0))
* force a publish ([feec6c2](https://github.com/dhis2/multi-calendar-dates/commit/feec6c28fd7b49febaa6a8ed98a6fe92979a6704))
* force a unpublish for alpha channel ([c4bcb20](https://github.com/dhis2/multi-calendar-dates/commit/c4bcb20d03150909ea12d4ba596b3b0d0c390162))
* force npm publish ([8021a97](https://github.com/dhis2/multi-calendar-dates/commit/8021a9739e85ee6bfc78c100acde66c5b78a7181))
* force npm publish ([d22e470](https://github.com/dhis2/multi-calendar-dates/commit/d22e4700511505fd699b0f1d1814064f885af8b5))
* force npm publish ([e5cb2ff](https://github.com/dhis2/multi-calendar-dates/commit/e5cb2ff91b9f72dd842af044aff64b8f5351554a))
* force npm publish ([39bd827](https://github.com/dhis2/multi-calendar-dates/commit/39bd827b7ff6a65cfb7e831b55dc8ded2716d509))
* force npm publish ([6f95463](https://github.com/dhis2/multi-calendar-dates/commit/6f95463988925465e09e90538b18f04ad1d09daf))
* force npm publish ([6b7fbf3](https://github.com/dhis2/multi-calendar-dates/commit/6b7fbf3227e1254b7fe651c49d118a258470a9f4))
* force npm publish ([2ce77b3](https://github.com/dhis2/multi-calendar-dates/commit/2ce77b3e920788b955dc243570e9b4816a3200db))
* force npm publish ([3e43ce4](https://github.com/dhis2/multi-calendar-dates/commit/3e43ce4592bd907ee0936ee81bc02949010ae50e))
* put pack semantic-release config ([4ae3f4c](https://github.com/dhis2/multi-calendar-dates/commit/4ae3f4cf848a7c736b12809a2bc4cb1f41f8ad11))
* remove .only for tests ([72fa7e5](https://github.com/dhis2/multi-calendar-dates/commit/72fa7e5c34cf0ec4e9a2f2ccfd7e705c480d1257))
* remove .only from test ([c685e34](https://github.com/dhis2/multi-calendar-dates/commit/c685e3496ffc8a46155d8564327570ddfd1efc7d))
* test npm publish ([40de24f](https://github.com/dhis2/multi-calendar-dates/commit/40de24f05a0e3d8277c0d3f39e7295d0dbf11f23))
* test npm publish ([69eb402](https://github.com/dhis2/multi-calendar-dates/commit/69eb4026e06340c2a7e6f34e77da9e8e5a7887d4))
* throw error if non-supported locale is passed for a custom calendar ([293db88](https://github.com/dhis2/multi-calendar-dates/commit/293db88269a079d4b3977859d5f7c62a661fa0f7))
* update current day selection logic to use same calendar system ([adb0dc8](https://github.com/dhis2/multi-calendar-dates/commit/adb0dc8541cd995192441339e7c36ccf49977a07))
* use numberinSystem if provided ([b3e82fb](https://github.com/dhis2/multi-calendar-dates/commit/b3e82fba160839beeafdc78f77f601d05e48f345))


### Features

* implement first iteration of the engine ([51526db](https://github.com/dhis2/multi-calendar-dates/commit/51526dbc08342c3ccaf59871f251af37aaf0b290))
* implement nepali calendar ([bcb66c6](https://github.com/dhis2/multi-calendar-dates/commit/bcb66c6b38db7ebab720c737d658ac0a0d67dcf5))
* implement nepali calendar from gregorian conversion ([4ee9173](https://github.com/dhis2/multi-calendar-dates/commit/4ee91733d6405b2ba53e8304c2dbabafff52e4a1))
* implement period calculation special cases for ethiopic calendar ([62b3de3](https://github.com/dhis2/multi-calendar-dates/commit/62b3de325450ab86d271b825d58ab2c83f18818c))
* implement rest of period calculations for gregrorian calendar ([9f83099](https://github.com/dhis2/multi-calendar-dates/commit/9f83099a4ad5361d6458be4606cfae8110ba44e1))
* implement some fixed period calculations for gregrorian calendar ([040bd8e](https://github.com/dhis2/multi-calendar-dates/commit/040bd8ed1afe9f9594513bace74b2ab23d35a80f))

# 1.0.0-alpha.1 (2022-12-26)


### Bug Fixes

* change english-nepal code to en-NP (not ne-EN) ([7e92aa4](https://github.com/dhis2/multi-calendar-dates/commit/7e92aa4efe7302aca3ad52ebd98d49a52141c15b))
* change param for useDatePicker from initialDate to date ([429b2eb](https://github.com/dhis2/multi-calendar-dates/commit/429b2ebb660dfbaf77de9f1748dfa7e7fc0472ea))
* change react dependency to fix issue with docusaurus build ([c58d560](https://github.com/dhis2/multi-calendar-dates/commit/c58d5603f1d30667bcdf241c8a3b02cd06fffdb9))
* change react to be a peer dependency ([fbf106c](https://github.com/dhis2/multi-calendar-dates/commit/fbf106cab1ed0dad52d0877c2b61fb3bd6c2540d))
* change the api for nepali calendar to accept a string ([3a51a6f](https://github.com/dhis2/multi-calendar-dates/commit/3a51a6f6b8a48649c0588b0f7421529c3ce64eb0))
* change useWeekDayLabels to accept a custom format for day names ([0369006](https://github.com/dhis2/multi-calendar-dates/commit/036900694aad88ed88f9b8242c537f9e01847b40))
* default to user timezone or UTC if no timezone passed ([e9c34e1](https://github.com/dhis2/multi-calendar-dates/commit/e9c34e14e0c3f6a7ab59ba7ecdf74959ddf0cc95))
* ensure that direction is either rtl or ltr ([4a92e91](https://github.com/dhis2/multi-calendar-dates/commit/4a92e91b979c4791613f50ca88c1a4d72a45e9c3))
* fallback to default locale if passed a wrong locale ([785a1b9](https://github.com/dhis2/multi-calendar-dates/commit/785a1b94c134b0ff42613b71d673505816186cbd))
* fix period generation for Nepali ([157e6a7](https://github.com/dhis2/multi-calendar-dates/commit/157e6a7812ab7480f190413c60a66f4bb86f68c0))
* force a publish ([feec6c2](https://github.com/dhis2/multi-calendar-dates/commit/feec6c28fd7b49febaa6a8ed98a6fe92979a6704))
* force npm publish ([d22e470](https://github.com/dhis2/multi-calendar-dates/commit/d22e4700511505fd699b0f1d1814064f885af8b5))
* force npm publish ([e5cb2ff](https://github.com/dhis2/multi-calendar-dates/commit/e5cb2ff91b9f72dd842af044aff64b8f5351554a))
* force npm publish ([39bd827](https://github.com/dhis2/multi-calendar-dates/commit/39bd827b7ff6a65cfb7e831b55dc8ded2716d509))
* force npm publish ([6f95463](https://github.com/dhis2/multi-calendar-dates/commit/6f95463988925465e09e90538b18f04ad1d09daf))
* force npm publish ([6b7fbf3](https://github.com/dhis2/multi-calendar-dates/commit/6b7fbf3227e1254b7fe651c49d118a258470a9f4))
* force npm publish ([2ce77b3](https://github.com/dhis2/multi-calendar-dates/commit/2ce77b3e920788b955dc243570e9b4816a3200db))
* force npm publish ([3e43ce4](https://github.com/dhis2/multi-calendar-dates/commit/3e43ce4592bd907ee0936ee81bc02949010ae50e))
* put pack semantic-release config ([4ae3f4c](https://github.com/dhis2/multi-calendar-dates/commit/4ae3f4cf848a7c736b12809a2bc4cb1f41f8ad11))
* remove .only for tests ([72fa7e5](https://github.com/dhis2/multi-calendar-dates/commit/72fa7e5c34cf0ec4e9a2f2ccfd7e705c480d1257))
* remove .only from test ([c685e34](https://github.com/dhis2/multi-calendar-dates/commit/c685e3496ffc8a46155d8564327570ddfd1efc7d))
* test npm publish ([40de24f](https://github.com/dhis2/multi-calendar-dates/commit/40de24f05a0e3d8277c0d3f39e7295d0dbf11f23))
* test npm publish ([69eb402](https://github.com/dhis2/multi-calendar-dates/commit/69eb4026e06340c2a7e6f34e77da9e8e5a7887d4))
* throw error if non-supported locale is passed for a custom calendar ([293db88](https://github.com/dhis2/multi-calendar-dates/commit/293db88269a079d4b3977859d5f7c62a661fa0f7))
* update current day selection logic to use same calendar system ([adb0dc8](https://github.com/dhis2/multi-calendar-dates/commit/adb0dc8541cd995192441339e7c36ccf49977a07))
* use numberinSystem if provided ([b3e82fb](https://github.com/dhis2/multi-calendar-dates/commit/b3e82fba160839beeafdc78f77f601d05e48f345))


### Features

* implement first iteration of the engine ([51526db](https://github.com/dhis2/multi-calendar-dates/commit/51526dbc08342c3ccaf59871f251af37aaf0b290))
* implement nepali calendar ([bcb66c6](https://github.com/dhis2/multi-calendar-dates/commit/bcb66c6b38db7ebab720c737d658ac0a0d67dcf5))
* implement nepali calendar from gregorian conversion ([4ee9173](https://github.com/dhis2/multi-calendar-dates/commit/4ee91733d6405b2ba53e8304c2dbabafff52e4a1))
* implement period calculation special cases for ethiopic calendar ([62b3de3](https://github.com/dhis2/multi-calendar-dates/commit/62b3de325450ab86d271b825d58ab2c83f18818c))
* implement rest of period calculations for gregrorian calendar ([9f83099](https://github.com/dhis2/multi-calendar-dates/commit/9f83099a4ad5361d6458be4606cfae8110ba44e1))
* implement some fixed period calculations for gregrorian calendar ([040bd8e](https://github.com/dhis2/multi-calendar-dates/commit/040bd8ed1afe9f9594513bace74b2ab23d35a80f))

# [1.0.0-beta.20](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.19...v1.0.0-beta.20) (2022-12-13)


### Bug Fixes

* remove .only from test ([c685e34](https://github.com/dhis2/multi-calendar-dates/commit/c685e3496ffc8a46155d8564327570ddfd1efc7d))

# [1.0.0-beta.19](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.18...v1.0.0-beta.19) (2022-12-13)


### Bug Fixes

* force npm publish ([e5cb2ff](https://github.com/dhis2/multi-calendar-dates/commit/e5cb2ff91b9f72dd842af044aff64b8f5351554a))

# [1.0.0-beta.18](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.17...v1.0.0-beta.18) (2022-12-13)


### Bug Fixes

* force npm publish ([39bd827](https://github.com/dhis2/multi-calendar-dates/commit/39bd827b7ff6a65cfb7e831b55dc8ded2716d509))

# [1.0.0-beta.17](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.16...v1.0.0-beta.17) (2022-12-13)


### Bug Fixes

* force npm publish ([6f95463](https://github.com/dhis2/multi-calendar-dates/commit/6f95463988925465e09e90538b18f04ad1d09daf))

# [1.0.0-beta.16](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.15...v1.0.0-beta.16) (2022-12-01)


### Bug Fixes

* force npm publish ([6b7fbf3](https://github.com/dhis2/multi-calendar-dates/commit/6b7fbf3227e1254b7fe651c49d118a258470a9f4))

# [1.0.0-beta.15](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.14...v1.0.0-beta.15) (2022-11-30)


### Bug Fixes

* force npm publish ([2ce77b3](https://github.com/dhis2/multi-calendar-dates/commit/2ce77b3e920788b955dc243570e9b4816a3200db))
* put pack semantic-release config ([4ae3f4c](https://github.com/dhis2/multi-calendar-dates/commit/4ae3f4cf848a7c736b12809a2bc4cb1f41f8ad11))

# [1.0.0-beta.14](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.13...v1.0.0-beta.14) (2022-11-24)


### Bug Fixes

* force a publish ([feec6c2](https://github.com/dhis2/multi-calendar-dates/commit/feec6c28fd7b49febaa6a8ed98a6fe92979a6704))

# [1.0.0-beta.13](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.12...v1.0.0-beta.13) (2022-11-23)


### Bug Fixes

* remove .only for tests ([72fa7e5](https://github.com/dhis2/multi-calendar-dates/commit/72fa7e5c34cf0ec4e9a2f2ccfd7e705c480d1257))

# [1.0.0-beta.12](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.11...v1.0.0-beta.12) (2022-11-23)


### Bug Fixes

* force npm publish ([3e43ce4](https://github.com/dhis2/multi-calendar-dates/commit/3e43ce4592bd907ee0936ee81bc02949010ae50e))

# [1.0.0-beta.11](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.10...v1.0.0-beta.11) (2022-11-23)


### Bug Fixes

* use numberinSystem if provided ([b3e82fb](https://github.com/dhis2/multi-calendar-dates/commit/b3e82fba160839beeafdc78f77f601d05e48f345))

# [1.0.0-beta.10](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.9...v1.0.0-beta.10) (2022-11-23)


### Bug Fixes

* throw error if non-supported locale is passed for a custom calendar ([293db88](https://github.com/dhis2/multi-calendar-dates/commit/293db88269a079d4b3977859d5f7c62a661fa0f7))

# [1.0.0-beta.9](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.8...v1.0.0-beta.9) (2022-11-23)


### Bug Fixes

* default to user timezone or UTC if no timezone passed ([e9c34e1](https://github.com/dhis2/multi-calendar-dates/commit/e9c34e14e0c3f6a7ab59ba7ecdf74959ddf0cc95))
* ensure that direction is either rtl or ltr ([4a92e91](https://github.com/dhis2/multi-calendar-dates/commit/4a92e91b979c4791613f50ca88c1a4d72a45e9c3))

# [1.0.0-beta.8](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.7...v1.0.0-beta.8) (2022-11-22)


### Bug Fixes

* change english-nepal code to en-NP (not ne-EN) ([7e92aa4](https://github.com/dhis2/multi-calendar-dates/commit/7e92aa4efe7302aca3ad52ebd98d49a52141c15b))

# [1.0.0-beta.7](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.6...v1.0.0-beta.7) (2022-11-21)


### Bug Fixes

* test npm publish ([40de24f](https://github.com/dhis2/multi-calendar-dates/commit/40de24f05a0e3d8277c0d3f39e7295d0dbf11f23))

# [1.0.0-beta.6](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2022-11-21)


### Bug Fixes

* change param for useDatePicker from initialDate to date ([429b2eb](https://github.com/dhis2/multi-calendar-dates/commit/429b2ebb660dfbaf77de9f1748dfa7e7fc0472ea))
* change the api for nepali calendar to accept a string ([3a51a6f](https://github.com/dhis2/multi-calendar-dates/commit/3a51a6f6b8a48649c0588b0f7421529c3ce64eb0))
* test npm publish ([69eb402](https://github.com/dhis2/multi-calendar-dates/commit/69eb4026e06340c2a7e6f34e77da9e8e5a7887d4))

# [1.0.0-beta.6](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2022-11-21)


### Bug Fixes

* change param for useDatePicker from initialDate to date ([429b2eb](https://github.com/dhis2/multi-calendar-dates/commit/429b2ebb660dfbaf77de9f1748dfa7e7fc0472ea))
* change the api for nepali calendar to accept a string ([3a51a6f](https://github.com/dhis2/multi-calendar-dates/commit/3a51a6f6b8a48649c0588b0f7421529c3ce64eb0))

# [1.0.0-beta.5](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2022-11-16)


### Bug Fixes

* change useWeekDayLabels to accept a custom format for day names ([0369006](https://github.com/dhis2/multi-calendar-dates/commit/036900694aad88ed88f9b8242c537f9e01847b40))

# [1.0.0-beta.4](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2022-11-15)


### Bug Fixes

* update current day selection logic to use same calendar system ([adb0dc8](https://github.com/dhis2/multi-calendar-dates/commit/adb0dc8541cd995192441339e7c36ccf49977a07))

# [1.0.0-beta.3](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2022-11-14)


### Bug Fixes

* change react dependency to fix issue with docusaurus build ([c58d560](https://github.com/dhis2/multi-calendar-dates/commit/c58d5603f1d30667bcdf241c8a3b02cd06fffdb9))

# [1.0.0-beta.2](https://github.com/dhis2/multi-calendar-dates/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2022-11-14)


### Bug Fixes

* change react to be a peer dependency ([fbf106c](https://github.com/dhis2/multi-calendar-dates/commit/fbf106cab1ed0dad52d0877c2b61fb3bd6c2540d))

# 1.0.0-beta.1 (2022-11-10)


### Bug Fixes

* fallback to default locale if passed a wrong locale ([785a1b9](https://github.com/dhis2/multi-calendar-dates/commit/785a1b94c134b0ff42613b71d673505816186cbd))


### Features

* implement first iteration of the engine ([51526db](https://github.com/dhis2/multi-calendar-dates/commit/51526dbc08342c3ccaf59871f251af37aaf0b290))
* implement nepali calendar ([bcb66c6](https://github.com/dhis2/multi-calendar-dates/commit/bcb66c6b38db7ebab720c737d658ac0a0d67dcf5))
* implement nepali calendar from gregorian conversion ([4ee9173](https://github.com/dhis2/multi-calendar-dates/commit/4ee91733d6405b2ba53e8304c2dbabafff52e4a1))
