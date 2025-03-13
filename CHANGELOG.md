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
- Added GPS-based dynamic location option for weather updates ([@prem-k-r](https://github.com/prem-k-r)) ([#331](https://github.com/XengShi/materialYouNewTab/pull/331))
- Added Claude to the list of AI Tools ([@prem-k-r](https://github.com/prem-k-r)) ([#424](https://github.com/XengShi/materialYouNewTab/pull/424))
- Added Dark Mode feature for all Color Themes ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#465](https://github.com/XengShi/materialYouNewTab/pull/465))
- Enabled vertical scroll to also control horizontal scrolling for AI Tools ([@prem-k-r](https://github.com/prem-k-r)) ([#495](https://github.com/XengShi/materialYouNewTab/pull/495))
- Added Discord shortcut ([@prem-k-r](https://github.com/prem-k-r)) ([185a981](https://github.com/XengShi/materialYouNewTab/pull/523/commits/185a98128ab0a066d0002c074df1bfb6212c638d))
- Added option to hide weather widgets ([@Viral-Sachde](https://github.com/Viral-Sachde)), ([@prem-k-r](https://github.com/prem-k-r)) ([#535](https://github.com/XengShi/materialYouNewTab/pull/535))
-  Added option to edit bookmark name and URL ([@prem-k-r](https://github.com/prem-k-r)) ([#541](https://github.com/XengShi/materialYouNewTab/pull/541))
-  Added DeepSeek to the list of AI Tools ([@prem-k-r](https://github.com/prem-k-r)) ([#544](https://github.com/XengShi/materialYouNewTab/pull/544))
-  Replaced default alert and confirm dialog boxes with a custom modal, including default keypress behavior ([@prem-k-r](https://github.com/prem-k-r)) ([#545](https://github.com/XengShi/materialYouNewTab/pull/545))
-  Set the browser's current default search engine as the selectable engine ([@prem-k-r](https://github.com/prem-k-r)) ([#479](https://github.com/XengShi/materialYouNewTab/pull/479))
-  

### Changed
- Weather retention time set to 2 minutes for user-entered API keys and 16 minutes otherwise ([@prem-k-r](https://github.com/prem-k-r)) ([#428](https://github.com/XengShi/materialYouNewTab/pull/428))
- Changed default Vietnamese font to *Be Vietnam Pro* ([@prem-k-r](https://github.com/prem-k-r)) ([#442](https://github.com/XengShi/materialYouNewTab/pull/442))
- Improved date format for Japanese and Korean ([@prem-k-r](https://github.com/prem-k-r)), ([@dempavof](https://github.com/dempavof)) ([#529](https://github.com/XengShi/materialYouNewTab/pull/529))
- Updated switch design per MD3 guidelines, adjusting inner thumb size based on state and reduced animation speed [@vchib1](https://github.com/vchib1)) ([#558](https://github.com/XengShi/materialYouNewTab/pull/558))
- Reduced radio buttons size in serch engines ([@vchib1](https://github.com/vchib1)), ([@prem-k-r](https://github.com/prem-k-r))

### Improved
- Adaptive icon now matches the theme color ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#435](https://github.com/XengShi/materialYouNewTab/pull/435)), ([@prem-k-r](https://github.com/prem-k-r)) ([#477](https://github.com/XengShi/materialYouNewTab/pull/477))
- Mic icon now hides properly, providing more space for queries ([@prem-k-r](https://github.com/prem-k-r)) ([#450](https://github.com/XengShi/materialYouNewTab/pull/450))
- Smoothed Close button animation ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#454](https://github.com/XengShi/materialYouNewTab/pull/454))
- Made the website responsive for better mobile usability ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#453](https://github.com/XengShi/materialYouNewTab/pull/453))
- Search engines dropdown now closes when an option is selected ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#453](https://github.com/XengShi/materialYouNewTab/pull/453))
- Shortcuts now scroll within their container instead of the whole screen when spanning multiple lines ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#453](https://github.com/XengShi/materialYouNewTab/pull/453))
- Improved keyboard and mouse interactions: clearing selected state when dropdown opens, preventing scrolling with arrow keys, ensuring Enter and clicks switch search engines, close the dropdown, and focus on the search input, including for the search engine radio buttons. ([@prem-k-r](https://github.com/prem-k-r)) ([#483](https://github.com/XengShi/materialYouNewTab/pull/483))
- Updated color picker shades for custom colors ([@prem-k-r](https://github.com/prem-k-r)) ([#493](https://github.com/XengShi/materialYouNewTab/pull/493))
- Updated new tab favicon ([@XengShi](https://github.com/XengShi)), ([@prem-k-r](https://github.com/prem-k-r))
- Enhanced weather icons by using 128x128 px images instead of 64x64 px ([@prem-k-r](https://github.com/prem-k-r)), ([@ceskyDJ](https://github.com/ceskyDJ)) ([#533](https://github.com/XengShi/materialYouNewTab/pull/533))
- Styled each shortcut as a separate card with a background color in the Edit Shortcuts list ([@prem-k-r](https://github.com/prem-k-r)) ([#536](https://github.com/XengShi/materialYouNewTab/pull/536))
- Added Throttle in Color Picker input for performance optimization ([@prem-k-r](https://github.com/prem-k-r)) ([#511](https://github.com/XengShi/materialYouNewTab/pull/511))
- 

### Removed
- Removed extension icon change ([@XengShi](https://github.com/XengShi))
- Removed Instagram shortcut ([@prem-k-r](https://github.com/prem-k-r)) ([185a981](https://github.com/XengShi/materialYouNewTab/pull/523/commits/185a98128ab0a066d0002c074df1bfb6212c638d))
- Removed Adobe Firefly from the list of AI Tools ([@prem-k-r](https://github.com/prem-k-r)) ([#544](https://github.com/XengShi/materialYouNewTab/pull/544))

### Fixed
- Fixed issue where search suggestions were partially hidden behind shortcuts on smaller screen heights ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#407](https://github.com/XengShi/materialYouNewTab/pull/407))
- Fixed issue where keyboard shortcuts were active in custom text box ([@prem-k-r](https://github.com/prem-k-r)) ([fa30642](https://github.com/XengShi/materialYouNewTab/pull/413/commits/fa3064253c45cdedb0d95618a97e66ce39a67ad3))
- Removed slight white boundaries around shortcut icons and the Close button ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#454](https://github.com/XengShi/materialYouNewTab/pull/454))
- Fixed issue with bookmarks toggle on unsupported devices ([@Thunder-Blaze](https://github.com/Thunder-Blaze)), ([@prem-k-r](https://github.com/prem-k-r))
- Fixed display issue when there are fewer than five search suggestions ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#453](https://github.com/XengShi/materialYouNewTab/pull/453))
- Custom text no longer overlaps the clock and is now limited to 3 lines, becoming scrollable beyond that ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#467](https://github.com/XengShi/materialYouNewTab/pull/467))
- Resolved issues where weather details sometimes failed to display properly ([@prem-k-r](https://github.com/prem-k-r))
- Centered shortcut names correctly when the width is 1–2 characters ([@prem-k-r](https://github.com/prem-k-r)) ([06bb4ca](https://github.com/XengShi/materialYouNewTab/pull/496/commits/06bb4cabe66b278a517483358519cc3c66232b90)
- Limited shortcut title width to prevent overflow onto other shortcuts ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#497](https://github.com/XengShi/materialYouNewTab/pull/497))
- Fixed AM/PM display error in certain languages when 12-hour format is enabled ([@shmps40802](https://github.com/shmps40802)) ([#500](https://github.com/XengShi/materialYouNewTab/pull/500))
-  Fixed bug where shortcut reset animation occurred only alternately; now it works every time ([@prem-k-r](https://github.com/prem-k-r)) ([c4cdd6c](https://github.com/XengShi/materialYouNewTab/pull/536/commits/c4cdd6c8719937b9fa93afc76cd111a94cf61350))
-  Corrected off-center Google menu icon alignment on certain devices ([@vchib1](https://github.com/vchib1)) ([#558](https://github.com/XengShi/materialYouNewTab/pull/558))
-  Fixed delayed radio button animation when hiding search engines ([@vchib1](https://github.com/vchib1)) ([#558](https://github.com/XengShi/materialYouNewTab/pull/558))


### Language-related
- Added support for Hungarian ([@Zan1456](https://github.com/Zan1456)) ([#420](https://github.com/XengShi/materialYouNewTab/pull/420))
- Added support for Nepali ([@sthaB-kash](https://github.com/sthaB-kash)) ([#452](https://github.com/XengShi/materialYouNewTab/pull/452))
- Added support for Traditional Chinese ([@shmps40802](https://github.com/shmps40802)) ([#499](https://github.com/XengShi/materialYouNewTab/pull/499))
- Added support for Urdu ([@prem-k-r](https://github.com/prem-k-r)), ([@asfand-dev](https://github.com/asfand-dev)) ([#548](https://github.com/XengShi/materialYouNewTab/pull/548))
- Updated translations:
  - Hindi ([@prem-k-r](https://github.com/prem-k-r))
  - Bengali ([@prem-k-r](https://github.com/prem-k-r)), ([@itz-rj-here](https://github.com/itz-rj-here))
  - Vietnamese ([@Tuan1-2-3](https://github.com/Tuan1-2-3))
  - French ([@iamwinner422](https://github.com/iamwinner422))
  - Italian ([@ZiClaud](https://github.com/ZiClaud))
  - Czech ([@ceskyDJ](https://github.com/ceskyDJ))
  - Indonesian ([@Ayyas-RF](https://github.com/Ayyas-RF))
  - Marathi ([@prem-k-r](https://github.com/prem-k-r))
  - Turkish ([@kerimlcr](https://github.com/kerimlcr))
  - Portuguese (Brazil) ([@MestreWalla](https://github.com/MestreWalla))
  - Russian ([@giwih](https://github.com/giwih))

### Other
- Updated documentations ([@prem-k-r](https://github.com/prem-k-r)), ([@itz-rj-here](https://github.com/itz-rj-here)), ([@ZiClaud](https://github.com/ZiClaud))
- Refactored codes ([@ZiClaud](https://github.com/ZiClaud)), ([@prem-k-r](https://github.com/prem-k-r))
- Chores ([@itz-rj-here](https://github.com/itz-rj-here)), ([@prem-k-r](https://github.com/prem-k-r))


--------
not

- Added option for sorting by date added in bookmarks ([@hasanakhiar](https://github.com/hasanakhiar)) ([#571](https://github.com/XengShi/materialYouNewTab/pull/571))
- Added Motivational Quotes feature ([@prem-k-r](https://github.com/prem-k-r)) ([#570](https://github.com/XengShi/materialYouNewTab/pull/570))
- Added search mode categorization ([@ashesbloom](https://github.com/ashesbloom)) ([#474](https://github.com/XengShi/materialYouNewTab/pull/474))
- Added v3.1 ([@prem-k-r](https://github.com/prem-k-r)) ([#574](https://github.com/XengShi/materialYouNewTab/pull/574))
- Added Split Search ([@prem-k-r](https://github.com/prem-k-r)) ([#575](https://github.com/XengShi/materialYouNewTab/pull/575))
- Added hide clock button ([@XengShi](https://github.com/XengShi))
- Added Tips and fixed bugs ([@prem-k-r](https://github.com/prem-k-r)) ([#585](https://github.com/XengShi/materialYouNewTab/pull/585))


