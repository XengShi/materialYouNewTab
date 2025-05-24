# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

- `Added` - for new features.
- `Changed` - for changes in existing functionality.
- `Improved` - for enhancements or optimizations in existing functionality.
- `Removed` - for features that have been removed.
- `Fixed` - for any bug fixes.
- `Localized` - for updates related to translations, localization, or internationalization.
- `Other` - for technical updates.

## [Unreleased](https://github.com/XengShi/materialYouNewTab/compare/v3...main)

<!-- ## [v3.1](https://github.com/XengShi/materialYouNewTab/compare/v3...v3.1) - May 2025 -->

### Added

- Added GPS-based dynamic location option for weather updates ([@prem-k-r](https://github.com/prem-k-r)) ([#331](https://github.com/XengShi/materialYouNewTab/pull/331))
- Added Claude to the list of AI Tools ([@prem-k-r](https://github.com/prem-k-r)) ([#424](https://github.com/XengShi/materialYouNewTab/pull/424))
- Added Dark Mode feature for all Color Themes ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#465](https://github.com/XengShi/materialYouNewTab/pull/465))
- Enabled vertical scroll to also control horizontal scrolling for AI Tools ([@prem-k-r](https://github.com/prem-k-r)) ([#495](https://github.com/XengShi/materialYouNewTab/pull/495))
- Added Discord shortcut ([@prem-k-r](https://github.com/prem-k-r)) ([185a981](https://github.com/XengShi/materialYouNewTab/pull/523/commits/185a98128ab0a066d0002c074df1bfb6212c638d))
- Added option to hide weather widgets ([@Viral-Sachde](https://github.com/Viral-Sachde)), ([@prem-k-r](https://github.com/prem-k-r)) ([#535](https://github.com/XengShi/materialYouNewTab/pull/535))
- Added option to edit bookmark name and URL ([@prem-k-r](https://github.com/prem-k-r)) ([#541](https://github.com/XengShi/materialYouNewTab/pull/541))
- Added DeepSeek to the list of AI Tools ([@prem-k-r](https://github.com/prem-k-r)) ([#544](https://github.com/XengShi/materialYouNewTab/pull/544))
- Replaced default alert and confirm dialog boxes with a custom modal, including default keypress behavior ([@prem-k-r](https://github.com/prem-k-r)) ([#545](https://github.com/XengShi/materialYouNewTab/pull/545))
- Set the browser's current default search engine as the selectable engine ([@prem-k-r](https://github.com/prem-k-r)) ([#479](https://github.com/XengShi/materialYouNewTab/pull/479))
- Added option for sorting by date added in bookmarks ([@hasanakhiar](https://github.com/hasanakhiar)) ([#571](https://github.com/XengShi/materialYouNewTab/pull/571))
- Added Motivational Quotes feature ([@prem-k-r](https://github.com/prem-k-r)), ([@XengShi](https://github.com/XengShi)), ([@Thunder-Blaze](https://github.com/Thunder-Blaze)), ([@itz-rj-here](https://github.com/itz-rj-here)) ([#570](https://github.com/XengShi/materialYouNewTab/pull/570))
- Added search mode categorization: 'Search With' search engines and 'Search On' platforms ([@ashesbloom](https://github.com/ashesbloom)), ([@prem-k-r](https://github.com/prem-k-r)), ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#474](https://github.com/XengShi/materialYouNewTab/pull/474))
- Added Wikipedia and Google Images to the list of search engines ([@prem-k-r](https://github.com/prem-k-r)) ([43aaf55](https://github.com/XengShi/materialYouNewTab/pull/474/commits/43aaf55f61affffa9fe5133d9ad1507e2c14a660))
- Added Tips ([@XengShi](https://github.com/XengShi)), ([@prem-k-r](https://github.com/prem-k-r)) ([0190dee](https://github.com/XengShi/materialYouNewTab/commit/0190dee9e0adfb5e4f68afa8529317eb6810d311)), ([#585](https://github.com/XengShi/materialYouNewTab/pull/585)), ([#589](https://github.com/XengShi/materialYouNewTab/pull/589))
- Added Reddit and Quora as Search Platforms ([@prem-k-r](https://github.com/prem-k-r)) ([#593](https://github.com/XengShi/materialYouNewTab/pull/593))
- Added option to hide Clock ([@XengShi](https://github.com/XengShi)), ([@prem-k-r](https://github.com/prem-k-r)) ([23cd5a8](https://github.com/XengShi/materialYouNewTab/commit/23cd5a86759d11944f447f4f448a710ccfe4d9fc)), ([#599](https://github.com/XengShi/materialYouNewTab/pull/599))
- Added location suggestion dropdown with real-time search feature ([@prem-k-r](https://github.com/prem-k-r)) ([#609](https://github.com/XengShi/materialYouNewTab/pull/609))
- Added option to show Minimun-Maximum temperature instead of Feels like ([@prem-k-r](https://github.com/prem-k-r)) ([#615](https://github.com/XengShi/materialYouNewTab/pull/615))
- Added Grok and Qwen to the list of AI Tools ([@prem-k-r](https://github.com/prem-k-r)) ([#624](https://github.com/XengShi/materialYouNewTab/pull/624))
- Added the ability to choose which AI shortcuts to display and set the order in which they appear ([@prem-k-r](https://github.com/prem-k-r)) ([#624](https://github.com/XengShi/materialYouNewTab/pull/624))

### Changed

- Weather retention time set to 7.25 minutes for user-entered API keys and 16 minutes otherwise ([@prem-k-r](https://github.com/prem-k-r)) ([#428](https://github.com/XengShi/materialYouNewTab/pull/428))
- Changed default Vietnamese font to 'Be Vietnam Pro' ([@prem-k-r](https://github.com/prem-k-r)) ([#442](https://github.com/XengShi/materialYouNewTab/pull/442))
- Improved date format for Japanese and Korean ([@prem-k-r](https://github.com/prem-k-r)), ([@dempavof](https://github.com/dempavof)) ([#529](https://github.com/XengShi/materialYouNewTab/pull/529))
- Updated toggle switch design; adjusted the inner thumb size based on state and reduced animation speed ([@vchib1](https://github.com/vchib1)) ([#558](https://github.com/XengShi/materialYouNewTab/pull/558))
- Reduced radio buttons size in search engines ([@vchib1](https://github.com/vchib1)), ([@prem-k-r](https://github.com/prem-k-r))
- Added throttle to Reddit search suggestions to prevent hitting rate limits during rapid typing ([@prem-k-r](https://github.com/prem-k-r)) ([#626](https://github.com/XengShi/materialYouNewTab/pull/626))

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
- Enhanced weather icons by using 128x128px images instead of 64x64px ([@prem-k-r](https://github.com/prem-k-r)), ([@ceskyDJ](https://github.com/ceskyDJ)) ([#533](https://github.com/XengShi/materialYouNewTab/pull/533))
- Styled each shortcut as a separate card with a background color in the Edit Shortcuts list ([@prem-k-r](https://github.com/prem-k-r)) ([#536](https://github.com/XengShi/materialYouNewTab/pull/536))
- Added Throttle in Color Picker input for performance optimization ([@prem-k-r](https://github.com/prem-k-r)) ([#511](https://github.com/XengShi/materialYouNewTab/pull/511))
- Added 5 more shared WeatherAPI keys ([@prem-k-r](https://github.com/prem-k-r)) ([916e3d6](https://github.com/XengShi/materialYouNewTab/pull/609/commits/916e3d6bd49c10fde9c2f24ac61a0570922c5c3a))
- Made AI tools shortcut icons a bit larger ([@prem-k-r](https://github.com/prem-k-r)) ([27c592f](https://github.com/XengShi/materialYouNewTab/pull/624/commits/27c592fecbdf0c440fc750ea7503c060e4c4deaf))

### Removed

- Removed extension icon change ([@XengShi](https://github.com/XengShi))
- Removed Instagram shortcut ([@prem-k-r](https://github.com/prem-k-r)) ([185a981](https://github.com/XengShi/materialYouNewTab/pull/523/commits/185a98128ab0a066d0002c074df1bfb6212c638d))
- Removed Adobe Firefly from the list of AI Tools ([@prem-k-r](https://github.com/prem-k-r)) ([#544](https://github.com/XengShi/materialYouNewTab/pull/544))
- Removed the vertical line that was present after 'Search With' ([@prem-k-r](https://github.com/prem-k-r))
- Removed the invalid URL syntax check for shortcuts ([@prem-k-r](https://github.com/prem-k-r)) ([aa63c4a](https://github.com/XengShi/materialYouNewTab/pull/622/commits/aa63c4a0ee10c44baf63c22acf637ffb11621416))

### Fixed

- Fixed issue where search suggestions were partially hidden behind shortcuts on smaller screen heights ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#407](https://github.com/XengShi/materialYouNewTab/pull/407))
- Fixed issue where keyboard shortcuts were active in custom text box ([@prem-k-r](https://github.com/prem-k-r)) ([fa30642](https://github.com/XengShi/materialYouNewTab/pull/413/commits/fa3064253c45cdedb0d95618a97e66ce39a67ad3))
- Removed slight white boundaries around shortcut icons and the Close button ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#454](https://github.com/XengShi/materialYouNewTab/pull/454))
- Fixed issue with bookmarks toggle on unsupported devices ([@Thunder-Blaze](https://github.com/Thunder-Blaze)), ([@prem-k-r](https://github.com/prem-k-r))
- Fixed display issue when there are fewer than five search suggestions ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#453](https://github.com/XengShi/materialYouNewTab/pull/453))
- Custom text no longer overlaps the clock and is now limited to 2 lines, becoming scrollable beyond that ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#467](https://github.com/XengShi/materialYouNewTab/pull/467))
- Resolved issues where weather details sometimes failed to display properly ([@prem-k-r](https://github.com/prem-k-r))
- Centered shortcut names correctly when the width is 1–2 characters ([@prem-k-r](https://github.com/prem-k-r)) ([06bb4ca](https://github.com/XengShi/materialYouNewTab/pull/496/commits/06bb4cabe66b278a517483358519cc3c66232b90))
- Limited shortcut title width to prevent overflow onto other shortcuts ([@Thunder-Blaze](https://github.com/Thunder-Blaze)) ([#497](https://github.com/XengShi/materialYouNewTab/pull/497))
- Fixed AM/PM display error in certain languages when 12-hour format is enabled ([@shmps40802](https://github.com/shmps40802)) ([#500](https://github.com/XengShi/materialYouNewTab/pull/500))
- Fixed bug where shortcut reset animation occurred only alternately; now it works every time ([@prem-k-r](https://github.com/prem-k-r)) ([c4cdd6c](https://github.com/XengShi/materialYouNewTab/pull/536/commits/c4cdd6c8719937b9fa93afc76cd111a94cf61350))
- Corrected off-center Google menu icon alignment on certain devices ([@vchib1](https://github.com/vchib1)) ([#558](https://github.com/XengShi/materialYouNewTab/pull/558))
- Fixed delayed radio button animation when hiding search engines ([@vchib1](https://github.com/vchib1)) ([#558](https://github.com/XengShi/materialYouNewTab/pull/558))

### Localized

- Added support for Hungarian ([@Zan1456](https://github.com/Zan1456)) ([#420](https://github.com/XengShi/materialYouNewTab/pull/420))
- Added support for Nepali ([@sthaB-kash](https://github.com/sthaB-kash)) ([#452](https://github.com/XengShi/materialYouNewTab/pull/452))
- Added support for Traditional Chinese ([@shmps40802](https://github.com/shmps40802)) ([#499](https://github.com/XengShi/materialYouNewTab/pull/499))
- Added support for Urdu ([@prem-k-r](https://github.com/prem-k-r)), ([@asfand-dev](https://github.com/asfand-dev)) ([#548](https://github.com/XengShi/materialYouNewTab/pull/548))
- Added support for German ([@prem-k-r](https://github.com/prem-k-r)) ([#641](https://github.com/XengShi/materialYouNewTab/pull/641))
- Added support for Persian ([@AMIRHOSSEIN-AHMADI-IR](https://github.com/AMIRHOSSEIN-AHMADI-IR)) ([#645](https://github.com/XengShi/materialYouNewTab/pull/641))
- Translation updated for:
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
- Refactored code ([@ZiClaud](https://github.com/ZiClaud)), ([@prem-k-r](https://github.com/prem-k-r))
- Chores ([@XengShi](https://github.com/XengShi)), ([@itz-rj-here](https://github.com/itz-rj-here)), ([@prem-k-r](https://github.com/prem-k-r))

---

## [v3](https://github.com/XengShi/materialYouNewTab/compare/v2.4...v3) - Dec 28, 2024

## [v2.4](https://github.com/XengShi/materialYouNewTab/compare/v2.3...v2.4) - Nov 26, 2024

## [v2.3](https://github.com/XengShi/materialYouNewTab/compare/v2.2...v2.3) - Nov 1, 2024

## [v2.2](https://github.com/XengShi/materialYouNewTab/compare/v2.0...v2.2) - Oct 23, 2024

## [v2.0](https://github.com/XengShi/materialYouNewTab/compare/v1.1...v2.0) - Oct 11, 2024

## v1.1 - Oct 2, 2024

## v1 - Aug 20, 2023
