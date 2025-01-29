## Adding a New Translation

1. **Create a New Translation File**
    - Name the file using the appropriate language code (e.g., `de.js` for German or `ar_SA.js` for Arabic).
    - Copy the content from `en.js` and paste it into the new file. Translate the strings as needed.
    - Delete any inline comments meant for instructions.
    - Place this file in the `locales` directory.

<br>

2. **Add the Locale to `index.html`**
    - Open `index.html` and locate the `<!-- LANGUAGES SCRIPTS -->` section.
    - Add your new locale script tag in chronological order, like this:
      ```html
      <script src="locales/de.js"></script>
      ```
    - Locate the `<!-- LANGUAGE SELECTION OPTIONS -->` section and add the new language option in lexicographical order:
      ```html
      <option value="de">German (Deutsch)</option>
      ```

<br>

3. **Update Date Format in `clock.js`**
    - Add the date display for both analog and digital clocks if the format differs from the default, ensuring chronological order.
    - Follow the local conventions for date formatting.
    - Ensure the digital clock display is correct regarding the 12-hour mode.

<br>

4. **Add the Locale to `languages.js`**
    - Add the language to `languages.js` in chronological order.
    - Check if the `menuWidth` needs to be adjusted.
    - If the language uses a comma instead of a dot as the decimal separator, make the necessary adjustments in the appropriate array.

<br>

5. **Update the Currently Supported Languages Section in `README.md`**
    - Add the new language to the list of supported languages in the README, ensuring lexicographical order.
    - Increase the count by 1 in both the header and the link at the top.

<br>

6. **Add the Locale to `tools/languagesAnalysis.html`**
    - (You can use this tool to get an overview of missing or extra strings in the language.)
    - Add the new language script tag in chronological order:
      ```html
      <script src="../locales/de.js"></script>
      ```
    - Add the language to the languages object in lexicographical order.

<br>

7. **Subscribe to Translation Updates for Contributors** (Optional)
   - Join the [discussion channel](https://github.com/XengShi/materialYouNewTab/discussions/195) or mailing list to receive notifications about new lines being added to translations.

<br>

### Notes:
- **Test the Translation**: Verify that the translations display correctly when the respective locale is selected, including hover texts and alerts.
- **Confirm in `weather.js`**: Ensure the humidity value stays on a single line. If it moves to a second line, increase the minimum width.
- **Keep Translations Consistent**: Ensure the structure of the new translation file matches existing ones for consistency across locales.
- **Additional Considerations**: Some languages may require specific adjustments based on regional needs.

---

### Definitions:
- **Lexicographical Order**: Alphabetical order based on the first character of each word.
- **Chronological Order**: The order in which languages are added, from the earliest to the most recent.
