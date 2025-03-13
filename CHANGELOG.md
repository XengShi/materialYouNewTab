All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

- `Added` - for new features.
- `Changed` - for changes in existing functionality.
- `Improved` - for enhancements or optimizations in existing functionality.
- `Removed` - for features that have been removed.
- `Fixed` - for any bug fixes.
- `Other` - for technical updates.
- `Translations` - for updates related to translations or internationalization (i18n).
- `New Contributors` - for listing new contributors to the project.

## [Unreleased](https://github.com/XengShi/materialYouNewTab/compare/v3.1...main)

### Added
- GPS-based dynamic location option for weather updates ([@prem-k-r](https://github.com/prem-k-r)) ([#331](https://github.com/XengShi/materialYouNewTab/pull/331))
- Claude to the list of AI Tools ([@prem-k-r](https://github.com/prem-k-r)) ([#424](https://github.com/XengShi/materialYouNewTab/pull/424))
- Dark Mode for all Color Themes ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#465](https://github.com/XengShi/materialYouNewTab/pull/465))
- 

### Changed
- Weather retention time set to 2 minutes for user-entered API keys and 16 minutes otherwise ([@prem-k-r](https://github.com/prem-k-r)) ([#428](https://github.com/XengShi/materialYouNewTab/pull/428))
- Changed default Vietnamese font to *Be Vietnam Pro* ([@prem-k-r](https://github.com/prem-k-r)) ([#442](https://github.com/XengShi/materialYouNewTab/pull/442))
- 

### Improved
- Adaptive icon now matches the theme color ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#435](https://github.com/XengShi/materialYouNewTab/pull/435)), ([@prem-k-r](https://github.com/prem-k-r)) ([#477](https://github.com/XengShi/materialYouNewTab/pull/477))
- Mic icon now hides properly, providing more space for queries ([@prem-k-r](https://github.com/prem-k-r)) ([#450](https://github.com/XengShi/materialYouNewTab/pull/450))
- Smoothed Close button animation ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#454](https://github.com/XengShi/materialYouNewTab/pull/454))
- Made the website responsive for better mobile usability ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#453](https://github.com/XengShi/materialYouNewTab/pull/453))
- Search engines dropdown now closes when an option is selected ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#453](https://github.com/XengShi/materialYouNewTab/pull/453))
- Shortcuts now scroll within their container instead of the whole screen when spanning multiple lines ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#453](https://github.com/XengShi/materialYouNewTab/pull/453))
- Improved keyboard and mouse interactions: clearing selected state when dropdown opens, preventing scrolling with arrow keys, ensuring Enter and clicks switch search engines, close the dropdown, and focus on the search input, including for the search engine radio buttons. ([@prem-k-r](https://github.com/prem-k-r)) ([#483](https://github.com/XengShi/materialYouNewTab/pull/483))
- Updated color picker shades for custom colors ([@prem-k-r](https://github.com/prem-k-r)) ([#493](https://github.com/XengShi/materialYouNewTab/pull/493))
- 

### Fixed
- Fixed issue where search suggestions were partially hidden behind shortcuts on smaller screen heights ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#407](https://github.com/XengShi/materialYouNewTab/pull/407))
- Fixed issue where keyboard shortcuts were active in custom text box ([@prem-k-r](https://github.com/prem-k-r)) ([fa30642](https://github.com/XengShi/materialYouNewTab/pull/413/commits/fa3064253c45cdedb0d95618a97e66ce39a67ad3))
- Removed slight white boundaries around shortcut icons and the Close button ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#454](https://github.com/XengShi/materialYouNewTab/pull/454))
- Fixed issue with bookmarks toggle on unsupported devices ([@Thunder-Blaze](https://github.com/Thunder-Blaze)), ([@prem-k-r](https://github.com/prem-k-r))
- Fixed display issue when there are fewer than five search suggestions ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#453](https://github.com/XengShi/materialYouNewTab/pull/453))
- Custom text no longer overlaps the clock and is now limited to 3 lines, becoming scrollable beyond that ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#467](https://github.com/XengShi/materialYouNewTab/pull/467))
- Resolved issues where weather details sometimes failed to display properly ([@prem-k-r](https://github.com/prem-k-r))


### Language-related
- Added support for Hungarian ([@Zan1456](https://github.com/Zan1456)) ([#420](https://github.com/XengShi/materialYouNewTab/pull/420))
- Added support for Nepali ([@sthaB-kash](https://github.com/sthaB-kash)) ([#452](https://github.com/XengShi/materialYouNewTab/pull/452))
- Updated translations:
  - Hindi ([@prem-k-r](https://github.com/prem-k-r))
  - Bengali ([@prem-k-r](https://github.com/prem-k-r)), ([@itz-rj-here](https://github.com/itz-rj-here))
  - Vietnamese ([@Tuan1-2-3](https://github.com/Tuan1-2-3))
  - French ([@iamwinner422](https://github.com/iamwinner422))
  - Italian ([@ZiClaud](https://github.com/ZiClaud))
  - Czech ([@ceskyDJ](https://github.com/ceskyDJ))
  - Indonesian ([@Ayyas-RF](https://github.com/Ayyas-RF))
  - 

### Other
- Updated documentations ([@prem-k-r](https://github.com/prem-k-r)), ([@itz-rj-here](https://github.com/itz-rj-here)), ([@ZiClaud](https://github.com/ZiClaud))
- Refactored codes ([@ZiClaud](https://github.com/ZiClaud)), ([@prem-k-r](https://github.com/prem-k-r))


--------
not

- Enabled vertical scroll for horizontal movement in AI Tools ([@prem-k-r](https://github.com/prem-k-r)) ([#495](https://github.com/XengShi/materialYouNewTab/pull/495))
- Added feature to hide the whole Weather section for more customization ([@Viral-Sachde](https://github.com/Viral-Sachde)) ([#535](https://github.com/XengShi/materialYouNewTab/pull/535))
- Added background color to Edit Shortcuts List ([@prem-k-r](https://github.com/prem-k-r)) ([#536](https://github.com/XengShi/materialYouNewTab/pull/536))
- Added option to edit bookmark name and URL ([@prem-k-r](https://github.com/prem-k-r)) ([#541](https://github.com/XengShi/materialYouNewTab/pull/541))
- Added DeepSeek to the list of AI Tools, removed Firefly ([@prem-k-r](https://github.com/prem-k-r)) ([#544](https://github.com/XengShi/materialYouNewTab/pull/544))
- Added Browser's default search engine ([@prem-k-r](https://github.com/prem-k-r)) ([#479](https://github.com/XengShi/materialYouNewTab/pull/479))
- Added option for sorting by date added in bookmarks ([@hasanakhiar](https://github.com/hasanakhiar)) ([#571](https://github.com/XengShi/materialYouNewTab/pull/571))
- Added Motivational Quotes feature ([@prem-k-r](https://github.com/prem-k-r)) ([#570](https://github.com/XengShi/materialYouNewTab/pull/570))
- Added search mode categorization ([@ashesbloom](https://github.com/ashesbloom)) ([#474](https://github.com/XengShi/materialYouNewTab/pull/474))
- Added v3.1 ([@prem-k-r](https://github.com/prem-k-r)) ([#574](https://github.com/XengShi/materialYouNewTab/pull/574))
- Added Split Search ([@prem-k-r](https://github.com/prem-k-r)) ([#575](https://github.com/XengShi/materialYouNewTab/pull/575))
- Added hide clock button ([@XengShi](https://github.com/XengShi))
- Added Tips and fixed bugs ([@prem-k-r](https://github.com/prem-k-r)) ([#585](https://github.com/XengShi/materialYouNewTab/pull/585))

### Changed
- Changed GPS button to toggle ([@prem-k-r](https://github.com/prem-k-r)) ([#560](https://github.com/XengShi/materialYouNewTab/pull/560))

### Improved
- Changed Grey theme name to Peach theme and Improved CSS code ([@prem-k-r](https://github.com/prem-k-r)) ([#496](https://github.com/XengShi/materialYouNewTab/pull/496))
- Moved Dark theme CSS to style.css ([@prem-k-r](https://github.com/prem-k-r)) ([#508](https://github.com/XengShi/materialYouNewTab/pull/508))
- Deleted favicon directory ([@XengShi](https://github.com/XengShi)) ([#525](https://github.com/XengShi/materialYouNewTab/pull/525))
- Updated index.html ([@XengShi](https://github.com/XengShi)) ([#526](https://github.com/XengShi/materialYouNewTab/pull/526))
- Updated script.js ([@XengShi](https://github.com/XengShi)) ([#527](https://github.com/XengShi/materialYouNewTab/pull/527))
- Enhanced favicon ([@prem-k-r](https://github.com/prem-k-r)) ([#528](https://github.com/XengShi/materialYouNewTab/pull/528))
- Separated `Shortcuts` code, Removed Instagram and Added Discord ([@prem-k-r](https://github.com/prem-k-r)) ([#523](https://github.com/XengShi/materialYouNewTab/pull/523))
- Updated date format for `ja` and `ko` ([@prem-k-r](https://github.com/prem-k-r)) ([#529](https://github.com/XengShi/materialYouNewTab/pull/529))
- Improved weather icons ([@prem-k-r](https://github.com/prem-k-r)) ([#533](https://github.com/XengShi/materialYouNewTab/pull/533))
- Separated Proxy and Search Suggestions from `script.js` ([@prem-k-r](https://github.com/prem-k-r)) ([#531](https://github.com/XengShi/materialYouNewTab/pull/531))
- Added Throttle in Color Picker input for performance optimization ([@prem-k-r](https://github.com/prem-k-r)) ([#511](https://github.com/XengShi/materialYouNewTab/pull/511))
- Minor changes in weather.js code ([@prem-k-r](https://github.com/prem-k-r)) ([#540](https://github.com/XengShi/materialYouNewTab/pull/540))
- Updated PageNotFound page ([@prem-k-r](https://github.com/prem-k-r)) ([#538](https://github.com/XengShi/materialYouNewTab/pull/538))
- Replaced alert and confirm dialog box with custom modal ([@prem-k-r](https://github.com/prem-k-r)) ([#545](https://github.com/XengShi/materialYouNewTab/pull/545))

### Fixed
- Fixed Shortcuts Title Overflow ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#497](https://github.com/XengShi/materialYouNewTab/pull/497))
- Fixed AM/PM Display Error ([@shmps40802](https://github.com/shmps40802)) ([#500](https://github.com/XengShi/materialYouNewTab/pull/500))
- Fixed live preview ([@prem-k-r](https://github.com/prem-k-r)) ([#506](https://github.com/XengShi/materialYouNewTab/pull/506))
- Fixed restore wallpaper bug ([@prem-k-r](https://github.com/prem-k-r)) ([#515](https://github.com/XengShi/materialYouNewTab/pull/515))
- Fixed Security Vulnerability for shortcuts ([@itz-rj-here](https://github.com/itz-rj-here)) ([#539](https://github.com/XengShi/materialYouNewTab/pull/539))
- Fixed security warnings ([@prem-k-r](https://github.com/prem-k-r)) ([#554](https://github.com/XengShi/materialYouNewTab/pull/554))
- Fixed Google menu icon alignment and Changed Switch button design ([@vchib1](https://github.com/vchib1)) ([#558](https://github.com/XengShi/materialYouNewTab/pull/558))
- Fixed search radio button hide delay ([@vchib1](https://github.com/vchib1)) ([#559](https://github.com/XengShi/materialYouNewTab/pull/559))

### Other
- Updated documentation ([@prem-k-r](https://github.com/prem-k-r)) ([#510](https://github.com/XengShi/materialYouNewTab/pull/510))
- Improved PR Template and Updated Issues Templates (Bug Report, Feature Request, General Question/Help Needed) with Contact Links ([@itz-rj-here](https://github.com/itz-rj-here)) ([#561](https://github.com/XengShi/materialYouNewTab/pull/561))
- Fixed Feature Request Template ([@itz-rj-here](https://github.com/itz-rj-here)) ([#565](https://github.com/XengShi/materialYouNewTab/pull/565))

### Translations
- Added translation for Traditional Chinese ([@shmps40802](https://github.com/shmps40802)) ([#499](https://github.com/XengShi/materialYouNewTab/pull/499))
- Updated translations for Hindi, Bengali, and Marathi ([@prem-k-r](https://github.com/prem-k-r)) ([#507](https://github.com/XengShi/materialYouNewTab/pull/507))
- Updated Turkish language support ([@kerimlcr](https://github.com/kerimlcr)) ([#513](https://github.com/XengShi/materialYouNewTab/pull/513))
- Updated Indonesian Translation ([@Ayyas-RF](https://github.com/Ayyas-RF)) ([#514](https://github.com/XengShi/materialYouNewTab/pull/514))
- Added new translations for French ([@iamwinner422](https://github.com/iamwinner422)) ([#516](https://github.com/XengShi/materialYouNewTab/pull/516))
- Updated Czech translation strings ([@ceskyDJ](https://github.com/ceskyDJ)) ([#518](https://github.com/XengShi/materialYouNewTab/pull/518))
- Added translations for latest strings (Hindi, Bengali, Marathi) ([@prem-k-r](https://github.com/prem-k-r)) ([#542](https://github.com/XengShi/materialYouNewTab/pull/542))
- Updated Czech translation ([@ceskyDJ](https://github.com/ceskyDJ)) ([#543](https://github.com/XengShi/materialYouNewTab/pull/543))
- Added translation for Urdu ([@prem-k-r](https://github.com/prem-k-r)) ([#548](https://github.com/XengShi/materialYouNewTab/pull/548))
- Updated Czech translation ([@ceskyDJ](https://github.com/ceskyDJ)) ([#550](https://github.com/XengShi/materialYouNewTab/pull/550))
- Updated translations for Hindi, Bengali, and Marathi ([@prem-k-r](https://github.com/prem-k-r)) ([#551](https://github.com/XengShi/materialYouNewTab/pull/551))
- Updated Indonesian Translation ([@Ayyas-RF](https://github.com/Ayyas-RF)) ([#552](https://github.com/XengShi/materialYouNewTab/pull/552))
- Updated Traditional Chinese translation ([@shmps40802](https://github.com/shmps40802)) ([#553](https://github.com/XengShi/materialYouNewTab/pull/553))
- Added new French translations ([@iamwinner422](https://github.com/iamwinner422)) ([#555](https://github.com/XengShi/materialYouNewTab/pull/555))
- Added new French translations ([@iamwinner422](https://github.com/iamwinner422)) ([#566](https://github.com/XengShi/materialYouNewTab/pull/566))
- Updated Indonesian Translation ([@Ayyas-RF](https://github.com/Ayyas-RF)) ([#567](https://github.com/XengShi/materialYouNewTab/pull/567))
- Added PT-BR Translation ([@MestreWalla](https://github.com/MestreWalla)) ([#568](https://github.com/XengShi/materialYouNewTab/pull/568))
- Updated translations for Hindi and Bengali, and removed redundant CSS ([@prem-k-r](https://github.com/prem-k-r)) ([#569](https://github.com/XengShi/materialYouNewTab/pull/569))
- Updated Czech translation ([@ceskyDJ](https://github.com/ceskyDJ)) ([#572](https://github.com/XengShi/materialYouNewTab/pull/572))
- Updated Indonesian Translations ([@Ayyas-RF](https://github.com/Ayyas-RF)) ([#573](https://github.com/XengShi/materialYouNewTab/pull/573))
- Updated Indonesian Translations ([@Ayyas-RF](https://github.com/Ayyas-RF)) ([#578](https://github.com/XengShi/materialYouNewTab/pull/578))
- Removed all extra strings from locales ([@itz-rj-here](https://github.com/itz-rj-here)) ([#580](https://github.com/XengShi/materialYouNewTab/pull/580))
- Updated translations for Hindi and Bengali ([@prem-k-r](https://github.com/prem-k-r)) ([#581](https://github.com/XengShi/materialYouNewTab/pull/581))
- Updated Russian translation ([@giwih](https://github.com/giwih)) ([#583](https://github.com/XengShi/materialYouNewTab/pull/583))
- Updated French translations with new search modes and motivational quotes ([@iamwinner422](https://github.com/iamwinner422)) ([#586](https://github.com/XengShi/materialYouNewTab/pull/586))

### New Contributors
- [@Zan1456](https://github.com/Zan1456) made their first contribution ([#420](https://github.com/XengShi/materialYouNewTab/pull/420))
- [@Tuan1-2-3](https://github.com/Tuan1-2-3) made their first contribution ([#443](https://github.com/XengShi/materialYouNewTab/pull/443))
- [@sthaB-kash](https://github.com/sthaB-kash) made their first contribution ([#452](https://github.com/XengShi/materialYouNewTab/pull/452))
- [@shmps40802](https://github.com/shmps40802) made their first contribution ([#499](https://github.com/XengShi/materialYouNewTab/pull/499))
- [@kerimlcr](https://github.com/kerimlcr) made their first contribution ([#513](https://github.com/XengShi/materialYouNewTab/pull/513))
- [@Viral-Sachde](https://github.com/Viral-Sachde) made their first contribution ([#535](https://github.com/XengShi/materialYouNewTab/pull/535))
- [@vchib1](https://github.com/vchib1) made their first contribution ([#558](https://github.com/XengShi/materialYouNewTab/pull/558))
- [@hasanakhiar](https://github.com/hasanakhiar) made their first contribution ([#571](https://github.com/XengShi/materialYouNewTab/pull/571))
- [@ashesbloom](https://github.com/ashesbloom) made their first contribution ([#474](https://github.com/XengShi/materialYouNewTab/pull/474))
